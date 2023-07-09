
const userRouter = require('express').Router()
const user = require('../model/User')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')
// const settings = require('../utils/settings')
const {existeUsuario} = require('./helpers/users')
const { sumarDias } = require('../utils/fechas')
const { validacionToken } = require('../modules/token')
const { validacionDatos } = require('./helpers/validators')
const {getFunctionsForSubscription} = require('./subscriptions')
const ten = require('../model/Tenant')
const Tenant = require('../model/Tenant')

const subValidUser = sub => {
    if(!sub.tenant.features.includes('user')) return false
    return true
}

const subValidFlux = sub => {
    if(!sub.tenant.features.includes('flux')) return false
    return true
}

const validarSubscription = async (req, res) => {
    const {sub, isUsable, useSubscription} = await getFunctionsForSubscription(req.get('Subscription'))
    if(!(await isUsable(req))){
        res.status(401).send({error: 'Su suscripción es inválida, probablemente haya expirado o rebasado el límite de llamadas adquirido.', date: new Date()})
        return false
    }

    if(!subValidUser(sub)){
        res.status(401).send({error: 'Su suscripción no incluye la API de users. Actualice para incluirla.', date: new Date()})
        return false
    }
    return useSubscription
}

/*
const uniqueForTenant = async (email, sub) => {
    const tenant = await ten.findById(sub.tenant.id).populate('users')
    // console.log(tenant)
    const emails = tenant.users.map(user => user.email)
    // console.log(emails)
    // console.log(email)
    // console.log(!emails.includes(email))
    return !emails.includes(email)
}
*/

userRouter.get('/exists', async(req, res) => {
    const useSubscription = await validarSubscription(req, res)
    if(useSubscription === false) return
    const email = req.body.email
    usuario = await existeUsuario(email)
    usuario !== false ? res.status(200).send(usuario) : res.status(400).send({exists: false})
    useSubscription()
})

userRouter.put('/changePassword', async(req, res) => {
    const useSubscription = await validarSubscription(req, res)
    if(useSubscription === false) return
    const token = jwt.verify(req.get('Authorization'), process.env.SECRET)
    const value = token.value
    const {oldPassword, newPassword} = req.body
    if(!(await validacionToken(token, req))) {
        res.status(401).send({reset: true, error: "Token inválido o incorrecto", date: new Date()})
        return
    }

    const myUser = await user.findOne({email: value.email})
    useSubscription()
    if(await bcrypt.compare(oldPassword, myUser.passwordHash)){
        if(oldPassword === newPassword){
            res.status(400).send({error: "No puedes usar la misma contraseña que tenías", date: new Date()})
            return
        }
        if(validacionDatos({password: newPassword})){
            const nPasswordEnc = await bcrypt.hash(newPassword, 10)
            myUser.passwordHash = nPasswordEnc
            await myUser.save()
            res.status(200).send({changedPassword: true, email: myUser.email, date: new Date()})
        }else{
            res.status(400).send({changedPassword: false, error: "Nueva contraseña no válida", date: new Date()})
        }
    }else{
        res.status(400).send({changedPassword: false, error: "La contraseña es incorrecta", date: new Date()})
    }
})

userRouter.put('/edit/:ajuste', async(req, res) => {
    await validarSubscription(req, res)
    const ajuste = req.params.ajuste
    const token = jwt.verify(req.get('Authorization'), process.env.SECRET)
    if(!validacionToken(token)){
        res.status(401).send({error: "Token inválido o incorrecto", date: new Date()})
        return
    }
    const {newValue} = req.body
    if(ajuste === "passwordHash") {res.status(405).send({error: {
        code: 324,
        description: "Método no disponible en esta dirección de API",
    }, date: new Date()})
    return
}
    const availabeAjustes = ["name", "apellidos", "email"]
    const myEmail = token.value.email
    if(!availabeAjustes.includes(ajuste)){
        res.status(405).send({error: {
            code: 324,
            description: "Método no disponible en esta dirección de API"
        }, date: new Date()})
        return
    }
    console.log(token)
    const myUser = await existeUsuario(myEmail)
    if(myUser === false) {
        res.status(400).send({error: {
            code: 125,
            description: "Token mal configurado"
        }, date: new Date()})
        return
    }
    const nToken = {
        ...token,
        value: {
            ...token.value,
            [ajuste]: newValue
        }
    }
    const newToken = jwt.sign(nToken, process.env.SECRET)
    myUser[ajuste] = newValue
    await myUser.save()
    res.status(202).send({success: true, 
        newToken,
        change: {[ajuste]: {
        oldValue: myEmail,
        newValue
    }}, date: new Date()})
})

userRouter.post('/login', async(req, res) => {
    const {email, password} = req.body
    const usuario = await existeUsuario(email)
    // console.log("Usuario " + usuario)
    const usarSubscription = await validarSubscription(req, res)
    if(usuario === false){
        res.status(404).send({error: 'No existe el email especificado', date: new Date()})
        return
    }
    if(usarSubscription === false) return
    if(usuario?.blocked?.value !== -1){
        /*
            -1 -> Activo
            -2 -> Bloqueado
            (fecha en int) -> Bloqueo temporal hasta dicha fecha
        */
        const fechaActual = new Date()
        if(usuario.blocked.value === -2){
            res.status(401).send({error: "Ha sido bloqueado permanentemente. Causa: " + usuario.blocked.reason})
            return
        }
        if(new Date(usuario.blocked.value) <= fechaActual){
            usuario.blocked = {
                value: -1,
                reason: ""
            }
            await usuario.save()
        }else{
            const fechaBloqueo = new Date(usuario.blocked.value)
            res.status(401).send({error: `Ha sido bloqueado hasta el ${fechaBloqueo.getDate()}/${fechaBloqueo.getMonth()+1}/${fechaBloqueo.getFullYear()}. Causa: ${usuario.blocked.reason}`})
            return
       }
    }
    if(await bcrypt.compare(password, usuario.passwordHash)){
            const ip = await bcrypt.hash(req.ip, 10)
            const token = jwt.sign({value: {name: usuario.name, apellidos: usuario.apellidos, email: usuario.email, tenant: usuario.tenant.nameId, rank: usuario.rank, blocked: usuario.blocked}, date: new Date(), ip}, process.env.SECRET)
            res.status(200).send({token, name: usuario.name, apellidos: usuario.apellidos, email: usuario.email})
    }else{
        res.status(404).send({error: 'La contraseña es incorrecta', date: new Date()})
    }
})

userRouter.post('/sign-in', async (req, res) => {
    /*
        name: (...)
        apellidos: (...)
        email: (...)
        password: (...)
    */
    const sub = req.get('Subscription')
    const usarSubscription = await validarSubscription(req, res)
    if(usarSubscription === false) return
    const body = req.body;
    usarSubscription()
    if(validacionDatos(body)){
        /*
        if(!(await uniqueForTenant(req.body.email, req))){
            console.log('OKKK')
            res.status(400).send({error: 'El email debe ser único.', date: new Date()})
            return
        }
        */
        const usuariom = await existeUsuario(req.body.email)
        if(usuariom !== false) {
            res.status(400).send({error: 'El email ya está en uso.', date: new Date()})
        }
        // console.log("oki final")
        const root_token = await Tenant.findOne({nameId: 'root'})
        const passwordHash = await bcrypt.hash(body.password, 10)
        const myUser = new user({
            name: body.name,
            apellidos: body.apellidos,
            email: body.email,
            passwordHash,
            rank: "usuario",
            blocked: {
                value: -1,
                reason: ""
            },
            tenant: root_token.id
        })
        await myUser.save()
        res.status(200).send({success: {
            type: 'sign up',
            code: 200,
            email: body.email
        }})
    }else{
        res.status(400).send({error: 'Datos introducidos incorrectos', date: new Date()})
    }
})

module.exports = userRouter

const userRouter = require('express').Router()
const user = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const settings = require('../utils/settings')
const {existeUsuario} = require('./helpers/users')
const { sumarDias } = require('../utils/fechas')
const { validacionToken } = require('../modules/token')
const { validacionDatos } = require('./helpers/validators')

userRouter.get('/exists', async(req, res) => {
    const email = req.body.email
    usuario = await existsUser(email)
    usuario !== false ? res.status(200).send(usuario) : res.status(400).send({exists: false})
})

userRouter.put('/changePassword', async(req, res) => {
    const token = jwt.verify(req.get('Authorization'), settings.SECRET)
    const value = token.value
    const {oldPassword, newPassword} = req.body
    if(!validacionToken(token, req)) {
        res.status(401).send({error: "Token inválido o incorrecto", date: new Date()})
        return
    }

    const myUser = await user.findOne({email: value.email})
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
    const ajuste = req.params.ajuste
    const token = jwt.verify(req.get('Authorization'), settings.SECRET)
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
    const newToken = jwt.sign(nToken, settings.SECRET)
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
    const usuario = await user.findOne({email})
    if(usuario){
        if(await bcrypt.compare(password, usuario.passwordHash)){
            const ip = await bcrypt.hash(req.ip, 10)
            const token = jwt.sign({value: {name: usuario.name, apellidos: usuario.apellidos, email: usuario.email}, date: new Date(), ip}, settings.SECRET)
            res.status(200).send({token, name: usuario.name, apellidos: usuario.apellidos, email: usuario.email})
        }else{
            res.status(404).send('Contraseña incorrecta')
        }
    }else{
        res.status(404).send('No existe el email')
    }
})

userRouter.post('/sign-in', async (req, res) => {
    /*
        name: (...)
        apellidos: (...)
        email: (...)
        password: (...)
    */
    const body = req.body;
    if(validacionDatos(body)){
        // console.log("oki final")
        const passwordHash = await bcrypt.hash(body.password, 10)
        const myUser = new user({
            name: body.name,
            apellidos: body.apellidos,
            email: body.email,
            passwordHash
        })
        await myUser.save()
        res.status(200).send({success: {
            type: 'sign up',
            code: 200,
            email: body.email
        }})
    }else{
        res.status(400).send({error: 'Datos introducidos incorrectos'})
    }
})

module.exports = userRouter
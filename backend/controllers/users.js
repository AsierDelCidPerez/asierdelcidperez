
const userRouter = require('express').Router()
const user = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const settings = require('../utils/settings')
const {existeUsuario} = require('./helpers/users')
const { sumarDias } = require('../utils/fechas')

const validarContrasena = password => {
    if(!password.match(/\W/)) return false
    if(!password.match(/[A-Z]/)) return false
    if(!password.match(/[a-z]/)) return false
    if(!password.match(/[0-9]/)) return false
    if(30 > password.length && password.length > 8) return true
    return false
}

const existsUser = async email => {
    const usuario = await existeUsuario(email)
    if(usuario){
        return usuario
    }else{
        return false
    }
}

const verifyTokenOfUser = token => {
    try{
        const user = jwt.verify(token, settings.SECRET)
        // console.log(user)
        if(user === undefined) return false
        const fecha = new Date(parseInt(user.date))
        // console.log(fecha)
        if(sumarDias(fecha, 360) < (new Date())) return false
        return user
    }catch(e) {return false}
}

const validacionDatos = ({name, apellidos, email, password}) => {
    if(name.length <= 0 && apellidos.length <= 0) return false
    // console.log("Oki")
    if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) return false
    // console.log("oki 2")
    if(validarContrasena(password)) return true
    return false
}

userRouter.get('/verify', async(req, res) => {
    const token = req.get('Authorization')
    verifyTokenOfUser(token) !== false ? res.status(200).send({verified: true, time: new Date()}) : res.status(400).send({verified: false, time: new Date()})
})

userRouter.get('/exists', async(req, res) => {
    const email = req.body.email
    usuario = await existsUser(email)
    usuario !== false ? res.status(200).send(usuario) : res.status(400).send({exists: false})
})

userRouter.put('/changePassword', async(req, res) => {
    const {token, oldPassword, newPassword} = req.body
    const user = jwt.verify(token)
})

userRouter.post('/login', async(req, res) => {
    const {email, password} = req.body
    const usuario = await user.findOne({email})
    if(usuario){
        if(await bcrypt.compare(password, usuario.passwordHash)){
            const ip = await bcrypt.hash(req.ip, 10)
            const token = jwt.sign({value: {name: usuario.name, apellidos: usuario.apellidos, email: usuario.email}, date: new Date().getTime().toString(), ip}, settings.SECRET)
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
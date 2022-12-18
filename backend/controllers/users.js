
const userRouter = require('express').Router()
const user = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const settings = require('../utils/settings')

const validarContrasena = password => {
    if(!password.match(/\W/)) return false
    if(!password.match(/[A-Z]/)) return false
    if(!password.match(/[a-z]/)) return false
    if(!password.match(/[0-9]/)) return false
    if(30 > password.length && password.length > 8) return true
    return false
}

const validacionDatos = ({name, apellidos, email, password}) => {
    if(name.length <= 0 && apellidos.length <= 0) return false
    // console.log("Oki")
    if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) return false
    // console.log("oki 2")
    if(validarContrasena(password)) return true
    return false
}

userRouter.post('/login', async(req, res) => {
    const {email, password} = req.body
    const usuario = await user.findOne({email})
    if(usuario){
        if(await bcrypt.compare(password, usuario.passwordHash)){
            const token = jwt.sign({value: {name: usuario.name, apellidos: usuario.apellidos, email: usuario.email}, date: new Date(), ip: req.ip}, settings.SECRET)
            res.status(200).send({token, name: usuario.name, apellidos: usuario.apellidos, email: usuario.email})
        }else{
            res.status(404).send({error: 'Contraseña incorrecta'})
        }
    }else{
        res.status(404).send({error: 'No existe el usuario'})
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
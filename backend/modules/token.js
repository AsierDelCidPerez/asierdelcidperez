/*
------------------------
Estructura token       -
------------------------
{
    value: {
        email: (...)
        name: (...)
        apellidos: (...)
    },
    ip: (...),
    date: (...)
}

*/

const {sumarDias} = require('./date')
const bcrypt = require('bcrypt')
const { existeUsuario, isBlocked } = require('../controllers/helpers/users')

const validacionToken = async (token, request) => {
    const usuario = await existeUsuario(token.value.email)
    // console.log(usuario)
    if(await bcrypt.compare(`${request.ip}`, token.ip)  && sumarDias(new Date(token.date), 30) > new Date() && !isBlocked(usuario)) return true
    else {
        // console.log("Lo especificado")
        return false
    }
}


module.exports = {
    validacionToken
}
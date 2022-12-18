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
const { existeUsuario } = require('../controllers/helpers/users')

const validacionToken = async (token, request) => {
    if(await bcrypt.compare(`${request.ip}`, token.ip) && sumarDias(new Date(token.date), 30) > new Date() && await existeUsuario(token.value.email)) return true
    else return false
}


module.exports = {
    validacionToken
}
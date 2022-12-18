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

const validacionToken = (token, request) => {
    if(token.ip === request.ip && sumarDias(token.date, 30) > new Date()) return true
    else return false
}


module.exports = {
    validacionToken
}
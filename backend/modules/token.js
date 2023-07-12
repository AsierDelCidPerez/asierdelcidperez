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

const validacionToken = async (token, request, sub) => {
    try{
        const usuario = await existeUsuario(token.value.email, sub.tenant.id)
    // console.log(usuario)
    // Desactivar al usar POSTAMN
    const availableItems = ['email', 'name', 'apellidos', 'imageIcon']
    for(let k in token.value) {
        // console.log(token.value[k] + " | " + usuario[k])
        if(token.value[k] !== usuario[k] && availableItems.includes(k)) return false
    }
    if(/*await bcrypt.compare(`${request.ip}`, token.ip)  &&*/ usuario && sumarDias(new Date(token.date), 30) > new Date() && !isBlocked(usuario)) return true
    else {
        // console.log("Lo especificado")
        return false
    }
} catch(e){
    return false
}
}


module.exports = {
    validacionToken
}
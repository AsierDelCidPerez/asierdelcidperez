const user = require('../../model/User')

const existeUsuario = async email => {
    const userRes = await user.findOne({email})
    if(userRes === null) return false
    return userRes
}


module.exports = {
    existeUsuario
}
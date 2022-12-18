const user = require('../../model/User')

const existeUsuario = async email => {
    const userRes = await user.findOne({email})
    return userRes
}

module.exports = {
    existeUsuario
}
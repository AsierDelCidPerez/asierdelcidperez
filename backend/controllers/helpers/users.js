const user = require('../../model/User')

const existeUsuario = async email => {
    const userRes = await user.findOne({email})
    if(userRes === null) return false
    return userRes
}

const isBlocked = user => {
    if(user.blocked.value !== -1){
        return true
    }
    return false
}


module.exports = {
    existeUsuario, isBlocked
}
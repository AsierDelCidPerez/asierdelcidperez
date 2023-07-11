const user = require('../../model/User')

const existeUsuario = async (email, tenantId) => {
    const userRes = await user.findOne({email, tenant: tenantId})
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
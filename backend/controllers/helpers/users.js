const user = require('../../model/User')

const existeUsuario = async (email, tenantId) => {
    try{
        const userRes = await user.findOne({email, tenant: tenantId})
        // console.log(userRes)
        if(userRes === null) return false
        return userRes
    }catch (e){
        return false
    }
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
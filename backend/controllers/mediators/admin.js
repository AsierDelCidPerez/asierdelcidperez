const User = require("../../model/User")
const errors = require("../helpers/errors")
const { hasAuthorization } = require("../helpers/ranks")
const { getChildren, getChildrenArray, getTenantsByNameId, } = require("../tenants")


const listUsers = async (config, sub, adminToken, res) => {
    if(config.revisarThatIncludesAtLeastOneRight(res, "listUsers")){
        const children = await getChildrenArray(sub.tenant.nameId)

        const tenants = (await getTenantsByNameId(children)).map(ten => {return {tenant: ten.id}})
        
        const users = (await User.find({$or: tenants})).map(user => {
            return {
                name: user.name,
                apellidos: user.apellidos,
                id: user.id,
                email: user.email
            }
        })

        res.status(200).send(users).end()
    }

}



const readUser = async (config, adminToken, res, id) => {
    if(config.revisarThatIncludesAtLeastOneRight(res, "readUser")){
        const externalUser = await User.findById(id)
        if(await hasAuthorization(adminToken.rank, externalUser, adminToken)){
            res.status(200).send(externalUser)
        }else{
            res.status(401).send({date: new Date(),...errors.admin.rights.insufficientRights})
        }
    }
}



module.exports = {
    listUsers,
    readUser
}
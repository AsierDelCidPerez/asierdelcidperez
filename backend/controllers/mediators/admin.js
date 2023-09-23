const Tenant = require("../../model/Tenant")
const User = require("../../model/User")
const config = require("../../settings/config")
const errors = require("../helpers/errors")
const { hasAuthorization } = require("../helpers/ranks")
const { validacionDatos } = require("../helpers/validators")
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
        console.log(adminToken)
        if(await hasAuthorization(adminToken.rank, externalUser, adminToken)){
            res.status(200).send(externalUser)
        }else{
            res.status(401).send({date: new Date(),...errors.admin.rights.insufficientRights})
        }
    }
}

const editUser = async (configConsole, adminToken, res, keys, id, ...values) => {
    if(configConsole.revisarThatIncludesAtLeastOneRight(res, "readUser")){
        const externalUser = await User.findById(id)
        const updated = {}
        const keysPermitidas = config.allowedKeysToEdit
        for(let i=0;i<keys.length;i++){
            console.log(keys[i])
            if(!keysPermitidas.includes(keys[i])) {
                res.status(400).send({date: new Date(), ...errors.admin.rights.keyNotAllowed(keys[i])}) // Error por key no permitida
                return
            }
            updated[keys[i]] = values[i]
        }

        if(!validacionDatos(updated)){
            res.status(400).send({date: new Date(), ...errors.data.formatData.malformatted})
        }

        if(await hasAuthorization(adminToken.rank, externalUser, adminToken)){
            for(let key in updated){
                externalUser[key] = updated[key]
            }
            await externalUser.save()

            const exTenant = await Tenant.findById(externalUser.tenant)

            externalUser.tenant = exTenant.nameId

            const exUser = externalUser.toJSON()


            exUser.tenant = exTenant.nameId
            console.log(exUser)

            res.status(200).send({...exUser, tenantNameId: exTenant.nameId})
        }else{
            res.status(401).send({date: new Date(),...errors.admin.rights.insufficientRights})
        }
    }
}


module.exports = {
    listUsers,
    readUser,
    editUser
}
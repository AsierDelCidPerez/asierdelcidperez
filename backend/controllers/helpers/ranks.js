const Rank = require("../../model/Rank")
const Tenant = require("../../model/Tenant")
const { getChildrenArrayPlain, getTenantByNameId } = require("../tenants")

const hasAuthorization = async (myRank, externalUser, adminToken) => {
    const mRank = await Rank.findOne({nameId: myRank})
    const exRank = await Rank.findOne({nameId: externalUser.rank})

    

    const myTenant = await Tenant.findById(adminToken.tenant)
    const exTenant = await Tenant.findById(externalUser.tenant)
    const myChildren = await getChildrenArrayPlain(myTenant.nameId)

    if(myChildren.includes(exTenant.nameId)){
        return true
    }else{
        if(mRank.priority < exRank.priority){
            return true
        }
    }
    return false
} 



module.exports = {
    hasAuthorization
}
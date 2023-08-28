const { default: mongoose } = require('mongoose')
const Tenant = require('../model/Tenant')

const tenRouter = require('express').Router()

    const getParents = async (nameId) => {
        const tenant = await Tenant.findOne({nameId})
        const parents = {}
        if(tenant.nameId === 'root') return parents 
        else {
            const parent = (await (await tenant.populate('owner')).populate('tenant')).tenant
            return {
                [await getParents(parent)]: {
                    parent
                }
            }
        }
    }

    const registrarUsuarioEnTenant = async (user, sub) => {
        const tenant = await Tenant.findById(sub.tenant._id.valueOf().toString())
        try{
            tenant.users = tenant.users.concat(user._id)
            // console.log(tenant)
            await Tenant.findByIdAndUpdate(tenant._id, tenant, {new: true})
            return true
        }catch(err){
            console.error(err)
            return false
        }
    }
    
    const getChildrenArray = async nameId => {
        const tenWithChildren = await Tenant.findOne({nameId}).populate('subTenants')
        // console.log(tenWithChildren.subTenants.map(ten => ten.nameId))
        const finalChildren = []

        finalChildren.push(tenWithChildren.nameId)
        
        if(tenWithChildren.subTenants.length === 0) {
            return [tenWithChildren.nameId]
        }else{
            const children = tenWithChildren.subTenants
            for(child of children) {
                const myChildren = await getChildrenArray(child.nameId)
                finalChildren.push(...myChildren)
            }
            return finalChildren
        }
    }

    const getChildrenArrayPlain = async nameId => {
        const children = await getChildrenArray(nameId)
        return children.filter(child => child !== nameId)
    }

    const getChildren = async nameId => {
        const tenWithChildren = await Tenant.findOne({nameId}).populate('subTenants')
        // console.log(tenWithChildren.subTenants.map(ten => ten.nameId))
        let finalChildren
        if(tenWithChildren.subTenants)
        finalChildren = {[tenWithChildren.nameId]: []} 
        if(tenWithChildren.subTenants.length === 0) {
            return tenWithChildren.nameId
        }else{
            const children = tenWithChildren.subTenants
            for(child of children) {
                const myChildren = await getChildren(child.nameId)
                if(child.subTenants.length === 0)finalChildren[tenWithChildren.nameId].push(myChildren)
                finalChildren[tenWithChildren.nameId][child.nameId] = myChildren
            }
            return finalChildren
        }
    }

    
    const isBlockedTenant = async tenant => {
        return !tenant.enabled
    }

    
    const getTenantByNameId = async nameId => {
        const tenant = await Tenant.findOne({nameId})
        return tenant
    }

    const getTenantsByNameId = async (...nameIds) => {
        const tenantNameIds = []
        nameIds.forEach(ten => {
            tenantNameIds.push({nameId: ten})
        })
        const tenants = await Tenant.find({$or: tenantNameIds})
        return tenants
    }


tenRouter.get('test', async(req, res) => {
    res.status(200).send({status: 'OK'})
})



module.exports = {
    tenRouter, registrarUsuarioEnTenant, isBlockedTenant, getChildren, getChildrenArray,
    getTenantsByNameId, getTenantByNameId, getChildrenArrayPlain
}
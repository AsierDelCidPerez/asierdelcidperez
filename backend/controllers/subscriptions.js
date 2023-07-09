const subRouter = require('express').Router()
const subscription = require('../model/Subscription')
require('../model/Tenant')

const getFunctionsForSubscription = async valueSubscription => {
    const sub = await subscription.findOne({value: valueSubscription}).populate('tenant')
    const isUsable = async req => {
        // console.log("Origin: " + req.get('Origin'))
        if(sub === null) return false
        console.log(sub.allowedDomains)
        console.log(req.get('Origin'))
        console.log(sub.allowedDomains.includes(req.get('Origin')))
        if(!sub.allowedDomains.includes(req.get('Origin'))) return false
        console.log("OKKK")
        if(sub.tenant.nameId === 'root' && sub.name === 'root') return true
        console.log(sub.expires)
        if(sub.expires < new Date()) return false
        if(sub.uses === sub.limitCalls) return false
        return true
    }

    const useSubscription = async () => {
        if(sub.tenant.nameId === 'root' && sub.name === 'root') return true
        sub.uses++
        await sub.save()
        return true
    }
    return {
        isUsable, useSubscription, sub
    }
}

module.exports = {
    getFunctionsForSubscription,
    subRouter
}
const subRouter = require('express').Router()
const subscription = require('../model/Subscription');
const { isBlockedTenant } = require('./tenants');
require('../model/Tenant')

const generateFormatForSubscription = () => {
    const banco = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let aleatoria = "";
    for (let i = 0; i < 5; i++) {
        for(let j=0;j<8;j++){
            aleatoria += banco.charAt(Math.floor(Math.random() * banco.length));
        }
        aleatoria += i !== 4 ? '-' : ''
    }
    return aleatoria;
}

const getFunctionsForSubscription = async valueSubscription => {
    const sub = await subscription.findOne({value: valueSubscription}).populate('tenant')
    const isUsable = async req => {
        // console.log("Origin: " + req.get('Origin'))
        if(sub === null) return false
        //Comentar al usar POSTMAN
        /*
         if(!sub.allowedDomains.includes(req.get('Origin'))) return false
        */
        if(sub.tenant.nameId === 'root' && sub.name === 'root') return true
        // console.log(sub.expires)
        if(isBlockedTenant(sub.tenant)) return false

        // Suscripción expirada, en este punto podría incorporarse un mecanismo para autorenovarla si la suscripción sigue activa.
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
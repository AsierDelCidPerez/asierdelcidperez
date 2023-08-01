const Rank = require('../model/Rank')
const User = require('../model/User')
const { getFunctionsForSubscription } = require('./subscriptions')
const jwt = require('jsonwebtoken')
const adminRouter = require('express').Router()

const validarSubscription = async (req=null, res=null, subscription=null, origin=true) => {
    const {sub, isUsable, useSubscription} = subscription===null ? await getFunctionsForSubscription(req.get('Subscription')) : await getFunctionsForSubscription(subscription)
    
    const revisarFeatures = (features=[], res) => {
        for(let k of features){
            if(!sub.tenant.features.includes(k)) {
                res.status(401).send({error: `Su suscripción no incluye la api ${k} necesaria para la operación solicitada`, date: new Date()})
                return false
            }
        }
    }
    
    try{
        if(!(await isUsable(req, origin))){
            res.status(401).send({error: 'Su suscripción es inválida, probablemente haya expirado o rebasado el límite de llamadas adquirido.', date: new Date()})
            return false
        }

        if(revisarFeatures(["admin", "user"], res)){ 
            return false
        }

    }catch(e) {
        console.log(e)
        res.status(401).send({error: 'Su suscripción no es válida.', date: new Date()})
        return false
    }

    

    return {useSubscription, sub, revisarFeatures}
}

/*

const validarSubscription = async (req, res) => {
    const {sub, isUsable, useSubscription} = await getFunctionsForSubscription(req.get('Subscription'))
    try{
        if(!(await isUsable(req))){
            res.status(401).send({error: 'Su suscripción es inválida, probablemente haya expirado o rebasado el límite de llamadas adquirido.', date: new Date()})
            return false
        }

        if(!subValidAdmin(sub)){
            res.status(401).send({error: 'Su suscripción no incluye la API de user. Actualice para incluirla.', date: new Date()})
            return false
        }
    }catch(e) {
        res.status(401).send({error: 'Su suscripción no es válida.', date: new Date()})
        return false
    }
    return {useSubscription, sub}
}

*/

adminRouter.post('/verify-rights', async(req, res) => {
    try{
    const adminToken = jwt.verify(req.body.adminToken, process.env.SECRET)

    const subscription = adminToken.sub

    const {useSubscription, sub} = await validarSubscription(req, res, subscription, false)

    if(useSubscription === undefined) return

    await useSubscription()
    
    const myUser = await User.findOne({email: adminToken.value.email, tenant: sub.tenant.id})

    const diRank = await Rank.findOne({nameId: myUser.rank})

    const actions = diRank.allowedActions

    const tokenAdmin = jwt.sign({
        email: adminToken.value.email,
        tenant: sub.tenant.id,
        date: new Date(),
        rights: actions,
        subscription
    }, process.env.SECRET)

    res.status(200).send({tokenAdmin,rights:actions})
}catch(e) {
    console.log(e)
    res.status(400).send({error: "Ha ocurrido un error inesperado",e,date: new Date()})
    return
}
})




module.exports = {adminRouter}
const Rank = require('../model/Rank')
const User = require('../model/User')
const { getFunctionsForSubscription } = require('./subscriptions')
const jwt = require('jsonwebtoken')
const adminRouter = require('express').Router()

const subValidAdmin = sub => {
    if(!sub.tenant.features.includes('admin')) return false
    return true
}

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

adminRouter.post('/verify-rights', async(req, res) => {
    const {useSubscription, sub} = await validarSubscription(req, res)
    if(useSubscription === undefined) return
    const token = req.get('Authorization')
    const tokenUser = jwt.verify(token, process.env.SECRET)

    const myUser = await User.findOne({email: tokenUser.value.email, tenant: sub.tenant.id})

    const diRank = await Rank.findOne({nameId: myUser.rank})

    const actions = diRank.allowedActions

    const tokenAdmin = jwt.sign({
        email: tokenUser.value.email,
        tenant: sub.tenant.id,
        date: new Date(),
        rights: actions
    }, process.env.SECRET)

    res.status(200).send({tokenAdmin,rights:actions})
})




module.exports = {adminRouter}
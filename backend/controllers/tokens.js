const tokenRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const settings = require('../utils/settings')
const {validacionToken} = require('../modules/token')
require('dotenv').config()
const {getFunctionsForSubscription} = require('./subscriptions')


const subValidUser = sub => {
    if(!sub.tenant.features.includes('user')) return false
    return true
}

const validarSubscription = async (req, res) => {
    const {sub, isUsable, useSubscription} = await getFunctionsForSubscription(req.get('Subscription'))
    if(!(await isUsable(req))){
        res.status(401).send({error: 'Su suscripción es inválida, probablemente haya expirado o rebasado el límite de llamadas adquirido.', date: new Date()})
        return false
    }

    if(!subValidUser(sub)){
        res.status(401).send({error: 'Su suscripción no incluye la API de users. Actualice para incluirla.', date: new Date()})
        return false
    }
    return useSubscription
}

tokenRouter.post('/verify-token', async (req, res) => {
    // Único caso en que el token va en el body
    const useSubscription = await validarSubscription(req, res)
    try {
        const tokenEn = req.body.token
        const token = jwt.verify(tokenEn, process.env.SECRET)
        console.log(token)
        if(token && await validacionToken(token, req)){
            res.status(200).send({valid: true, token})
        }else{
            res.status(401).send({reset: true,valid: false})
        }
    }catch(err){
        res.status(400).send({valid: false})
    }
})

module.exports = tokenRouter
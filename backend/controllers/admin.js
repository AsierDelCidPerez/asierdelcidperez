const Rank = require('../model/Rank')
const User = require('../model/User')
const { getFunctionsForSubscription } = require('./subscriptions')
const jwt = require('jsonwebtoken')
const adminRouter = require('express').Router()
const errors = require('./helpers/errors')
const { sumarDias } = require('../../admin/src/utils/functions/dates/dates')
const config = require('../settings/config')
const { listUsers, readUser, editUser } = require('./mediators/admin')
const ranks = require('../utils/ranks')

const validarSubscription = async (req=null, res=null, subscription=null, origin=true) => {
    // Si origin es true entonces no se toma en cuenta el origen de la suscripción al revisarlo.
    const {sub, isUsable, useSubscription} = subscription===null ? await getFunctionsForSubscription(req.get('Subscription')) : await getFunctionsForSubscription(subscription)
    
    const revisarFeatures = (features=[]) => {
        for(let k of features){
            if(!sub.tenant.features.includes(k)) {
                res.status(401).send({error: `Su suscripción no incluye la api ${k} necesaria para la operación solicitada`, date: new Date()})
                return true
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

const isExpired = date => new Date() > sumarDias(date, config.expirePeriodInDays)

const verificarAdminToken = (adminToken, res) => { // Devuelve false si no verifica, true en caso contrario.
    if(isExpired(adminToken.date)){
        res.status(401).send({error: `El token ha expirado (Han pasado ${config.expirePeriodInDays} días). Vuelva a iniciar sesión.`})
    }
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

adminRouter.post('/verify-rights/token', async(req, res) => {
    let token = null
    const {rightsToken: tokenBody, services=[]} = req.body

    try{
        token = jwt.verify(tokenBody, process.env.SECRET)
    }catch(e){
        res.status(401).send({...errors.token.invalid.invalidToken, date: new Date()})
        console.error(e)
        return
    }

    const subscription = token.sub

    const {useSubscription, sub, revisarFeatures} = await validarSubscription(req, res, subscription)

    if(useSubscription === undefined) return

    await useSubscription()

    delete token.iat

    if(revisarFeatures(services.concat('flux'))) return

    const myUser = await User.findOne({email: token.value.email, tenant: sub.tenant.id})

    const diRank = await Rank.findOne({nameId: myUser.rank})

    const actions = diRank.allowedActions

    const tokenAdmin = jwt.sign({
        email: token.value.email,
        tenant: sub.tenant.id,
        date: new Date(),
        rights: actions,
        rank: myUser.rank,
        subscription,
        ip: token.ip
    }, process.env.SECRET)

    res.status(200).send({tokenAdmin, rights: actions,  imageIcon: myUser.imageIcon, name: myUser.name, apellidos: myUser.apellidos, email: myUser.email, rank: myUser.rank})

})

adminRouter.post('/admin-console', async(req, res) => {
    const body = req.body
    // Variables -> (adminToken, services, )
    let adminToken = null
    try{
        adminToken = jwt.verify(req.body.adminToken, process.env.SECRET)
    }catch(e){
        res.status(401).send({...errors.token.invalid.invalidToken, date: new Date()})
        console.error(e)
        return
    }
    // console.log(adminToken)
    const {useSubscription, sub, revisarFeatures} = await validarSubscription(req, res, adminToken.subscription, false)

    if(revisarFeatures(body.services)) return

    if(useSubscription === undefined) return

    await useSubscription()

    /*
    Estructura body
        {
            adminToken: "...",
            cmdlet: "...",
            params: [...]
        }
    */

    const cmdlet = body.cmdlet.split("|")

    const revisarThatIncludesAllRights = (res, ...rights) => {
        const util = ranks.getEffectiveRanksOf(adminToken.rights)
        for(let i of rights){
            if(!util.includes(i)){
                res.status(401).send({date: new Date(), ...errors.admin.rights.insufficientRights})
                return false
            }
        }
        return true
    }


    const revisarThatIncludesAtLeastOneRight = (res, ...rights) => {
        const util = ranks.getEffectiveRanksOf(...adminToken.rights)

        if(ranks.includeAtLeastOneRank(util, rights)){
            return true
        }else{
            res.status(401).send({date: new Date(), ...errors.admin.rights.insufficientRights})
            return false
        }
    }

    const configConsole = {revisarThatIncludesAllRights, revisarThatIncludesAtLeastOneRight}

    if(cmdlet[0] !== "admin"){
        res.status(400).send({date: new Date(), ...errors.admin.console.notUtilStart})
        return
    }

    if(revisarFeatures(["user", "admin"])) return

    switch(cmdlet[1]){
        case "listUsers": {
            await listUsers(configConsole, sub, adminToken, res, ...body?.params)
            break
        }
        case "readUser": {
            await readUser(configConsole, adminToken, res, ...body?.params) 
            break
        }
        case "editUser": {
            switch(cmdlet[2]){
                case "nameAndLastName": {
                    await editUser(configConsole, adminToken, res, ["name", "apellidos"],...body?.params)
                    break
                }
            }

            break
        }
        default: {
            res.status(400).send({date: new Date()}) // Mandar error por comando no encontrado
            break
        }
    }

})

adminRouter.post('/verify-rights', async(req, res) => {
    try{
    const services = req.body.services
    const adminToken = jwt.verify(req.body.adminToken, process.env.SECRET)

    const subscription = adminToken.sub

    const {useSubscription, sub, revisarFeatures} = await validarSubscription(req, res, subscription)

    if(useSubscription === undefined) return

    await useSubscription()

    if(revisarFeatures(services, res)) return

    const myUser = await User.findOne({email: adminToken.value.email, tenant: sub.tenant.id})

    const diRank = await Rank.findOne({nameId: myUser.rank})

    const actions = diRank.allowedActions

    const tokenAdmin = jwt.sign({
        email: adminToken.value.email,
        tenant: sub.tenant.id,
        date: new Date(),
        rights: actions,
        subscription,
        ip: adminToken.ip,
        rank: myUser.rank
    }, process.env.SECRET)

    res.status(200).send({tokenAdmin,rights:actions,name:adminToken.value.name, apellidos: adminToken.value.apellidos, email: adminToken.value.email, imageIcon: adminToken.value.imageIcon, rank: myUser.rank})
}catch(e) {
    console.log(e)
    res.status(400).send({error: "Ha ocurrido un error inesperado",e,date: new Date()})
    return
}
})




module.exports = {adminRouter}
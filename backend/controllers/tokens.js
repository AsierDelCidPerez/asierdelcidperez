const tokenRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const settings = require('../utils/settings')
const {validacionToken} = require('../modules/token')

tokenRouter.post('/verify-token', async (req, res) => {
    // Único caso en que el token va en el body
    try {
        const tokenEn = req.body.token
        const token = jwt.verify(tokenEn, settings.SECRET)
        console.log(token)
        if(token && await validacionToken(token, req)){
            res.status(200).send({valid: true, token})
        }else{
            res.status(400).send({valid: false})
        }
    }catch(err){
        res.status(400).send({valid: false})
    }
})

module.exports = tokenRouter
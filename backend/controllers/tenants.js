const tenRouter = require('express').Router()

tenRouter.get('test', async(req, res) => {
    res.status(200).send({status: 'OK'})
})

module.exports = tenRouter
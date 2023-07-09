require('express-async-errors')
const express = require('express')
const app = express()

const imageRouter = require('./controllers/images')
const userController = require('./controllers/users')
const cors = require('cors')
const errorHandling = require('./utils/errors')
const mongoose = require('mongoose')

require('dotenv').config()
var bodyParser = require('body-parser')
const tokenRouter = require('./controllers/tokens')
const { emailRouter } = require('./controllers/emails')
const tenRouter = require('./controllers/tenants')
mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Connected to MONGODB"))

bodyParser.json([this.options])
app.use(express.json())
app.use(cors())

app.use('/api/images', imageRouter)
app.use('/api/tenants', tenRouter)
app.use('/api/emails', emailRouter)
app.use('/api/users', userController)
app.use('/api/tokens', tokenRouter)


app.use(errorHandling)


app.use(express.static('build'))

/*
server.start().then(() => {
    console.log("GQL running")
    server.applyMiddleware({app})
})

*/
module.exports = app

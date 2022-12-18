require('express-async-errors')
const express = require('express')
const app = express()
const { ApolloServer } = require('apollo-server-express')
const resolvers = require('./gql/resolvers')
const typeDefs = require('./gql/typeDefs')
const imageRouter = require('./controllers/images')
const userController = require('./controllers/users')
const cors = require('cors')
const settings = require('./utils/settings')
const errorHandling = require('./utils/errors')
const mongoose = require('mongoose')
const server = new ApolloServer({
    typeDefs, resolvers
})
var bodyParser = require('body-parser')
const tokenRouter = require('./controllers/tokens')
mongoose.connect(settings.MONGODB_URI).then(() => console.log("Connected to MONGODB"))

bodyParser.json([this.options])
app.use(express.json())
app.use(cors())

app.use('/api/images', imageRouter)
app.use('/api/users', userController)
app.use('/api/tokens', tokenRouter)
app.use(express.static('build'))

app.use(errorHandling)

server.start().then(() => {
    console.log("GQL running")
    server.applyMiddleware({app})
})

module.exports = app
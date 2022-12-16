const express = require('express')
const app = express()
const { ApolloServer } = require('apollo-server-express')
const resolvers = require('./gql/resolvers')
const typeDefs = require('./gql/typeDefs')
const imageRouter = require('./controllers/images')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const body_parser = require('body-parser')
const server = new ApolloServer({
    typeDefs, resolvers
})
var bodyParser = require('body-parser')
const fs = require('fs')

bodyParser.json([this.options])
app.use(express.json())
app.use(cors())

server.start().then(() => {
    console.log("GQL running")
    server.applyMiddleware({app})
})

app.use('/api/images', imageRouter)
app.use(express.static('build'))

app.get('/prueba', (req, res) => res.json({"Buenos dias": "ok"}))

app.get('/uploads/:id', (req, res) => {
    const id = req.params.id
    res.sendFile(__dirname + `/uploads/${id}`)
})

module.exports = app
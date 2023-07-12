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
const {tenRouter} = require('./controllers/tenants')
const jwt = require('jsonwebtoken')

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


app.get('/atribuciones', (req, res) => {
    res.send(
        `
        <!DOCTYPE html>
<html>
<head>
  <title>Atribuciones</title>
  <style>
    body {
        background-color: #152238;
      font-family: Arial, sans-serif;
      padding: 10px;
    }
    
    h1 {
      color: white;
      text-align: center;
      padding: 20px 0;
    }
    
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }
    
    li {
      margin-bottom: 10px;
      padding: 10px;
      color: #ffffff;
      background-color: #0073ff;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
  </style>
</head>
<body>
  <h1>Atribuciones</h1>
  
  <ul>
    <li><a href="https://www.flaticon.com/de/kostenloses-icon/email_1378313?term=email&page=1&position=14&origin=search&related_id=1378313">Flaticon (Freepik)</a></li>
    <li><a href="https://www.flaticon.com/de/kostenloses-icon/schlussel_2443038?term=key&page=1&position=5&origin=search&related_id=2443038">Flaticon (Freepik)</li>
    <li>Atribución 3</li>
    <li>Atribución 4</li>
  </ul>
</body>
</html>

        `
    )
})

app.use(function(req, res, next){
    res.status(404);
    res.type('html').send(`
    <!DOCTYPE html>
        <html lang="es">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error 404 - Página no encontrada</title>
        <style>
            @keyframes myAnim {
                0% {
                    transform: translateX(-100%) rotate(-360deg);
                }

                100% {
                    transform: translateX(100%) rotate(360deg);
                }
            }
            body {
            background-color: #152238;
            color: #fff;
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
            }

            h1 {
            font-size: 36px;
            }

            p {
            font-size: 18px;
            }
            .rodando {
                animation: myAnim 5s ease 0s infinite alternate-reverse both;
            }
            a {
            color: #fff;
            text-decoration: none;
            }
        </style>
        </head>
        <body>

        <img class="rodando" src="https://i.imgur.com/PVHx0vQ.png" width="100px"/>
        <h1>Error 404</h1>
        <p>Lo sentimos, la página que estás buscando no se encuentra.</p>
        <p>Por favor, verifica la URL o vuelve a la <a href="/">página de inicio</a>.</p>
        </body>
        </html>  
    `)
  });

/*
server.start().then(() => {
    console.log("GQL running")
    server.applyMiddleware({app})
})

*/
module.exports = app

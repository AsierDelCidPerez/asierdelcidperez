const expres = require('express')

const app = expres()

app.use(expres.static('build'))

module.exports = app
const app = require('./app')
require('dotenv').config()

app.listen(process.env.PORT, () => {
    console.log(`URL Backend: http://localhost:${process.env.PORT}`)
})


const app = require('./app')
const config = require('./utils/settings')

app.listen(config.port, () => {
    console.log(`URL Backend: https://localhost:${config.port}`)
})


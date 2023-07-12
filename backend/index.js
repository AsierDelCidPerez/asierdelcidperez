const app = require('./app')
const { encryptData, decrypt } = require('./utils/encryptionCenter')
require('dotenv').config()

const valor = "DvNc#KJZJ47ty%!94Ev@"
const valorEnc = encryptData(valor)

/*
console.log(valorEnc)
const valorDec = decrypt(valorEnc)
console.log(valorDec)
*/

app.listen(process.env.PORT, () => {
    console.log(`URL Backend: http://localhost:${process.env.PORT}`)
})


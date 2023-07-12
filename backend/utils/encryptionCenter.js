const Cryptr = require('cryptr')
require('dotenv').config()

const activarCifradoReposo = true
const myBank = new Cryptr(process.env.SECRET_2)

const encryptData = data => {
    return myBank.encrypt(data)
} 

const decrypt = encrypted => {
    return myBank.decrypt(encrypted)
}

module.exports = {encryptData, decrypt, activarCifradoReposo}
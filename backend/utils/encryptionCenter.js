const Cryptr = require('cryptr')
require('dotenv').config()

const activarCifradoReposo = false
const myBank = new Cryptr(process.env.SECRET_2)

const encryptData = data => {
    return myBank.encrypt(data)
} 

const enviarDatos = (data, exceptions=[]) => {
    if(!activarCifradoReposo) return data
    const dataUser = {}
    for(let k in data){
        if(exceptions.includes(k)){
            dataUser[k] = data[k]
        }else{
            dataUser[k] = encryptData(data[k])
        }
    }
    return dataUser
}

// ¿Cómo organizar la seguridad? -> SecurityX Hub

/*
const recogerDatos = (datos, format={/*
    blocked
})
*/

const decrypt = encrypted => {
    return myBank.decrypt(encrypted)
}

module.exports = {encryptData, decrypt, activarCifradoReposo, enviarDatos}
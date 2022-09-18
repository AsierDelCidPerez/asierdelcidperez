const imageRouter = require('express').Router()
const axios = require('axios')
const multer = require('multer')

let token = null;

function toBase64(arr) {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return arr.toString('base64')
}

const uploadAnImage = async base64image => {
    const config = {
        headers: {
            Authorization: 'Client-ID dbd24b58b3abd6e',
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    }

    const myBody = {
        image: base64image,
        type: 'base64'
    }
    
    return axios.post('https://api.imgur.com/3/image/', myBody, config)
}

imageRouter.get('/', (req, res) => {
    return res.json({Testing: 'OKAY'})
})

imageRouter.post('/', multer({storage: multer.memoryStorage()}).array('images'), async(req, res) => {
    const body = req.body
    const imageUri = body.image
    const images = req.files
    let promesas = []
    
    for(let i=0;i<images.length;i++){
        promesas = promesas.concat(uploadAnImage(toBase64(images[i].buffer)))
    }

    try {
        const respuestas = await Promise.all(promesas)
        return res.json(respuestas.map(respuesta => respuesta.data.data.link))
    }catch(err){
        res.json(err)
    }
})

module.exports = imageRouter
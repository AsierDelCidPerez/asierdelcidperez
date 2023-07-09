const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const correoSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    asunto: {
        type: String
    },
    isHtml: {
        type: Boolean,
        required: true
    },
    text: {
        type: String,
        required: true,
    },
    messageId: {
        type: 'String',
        required: true
    }
})

correoSchema.plugin(uniqueValidator)

correoSchema.set('toJSON', {
    transform: (_, reqObj) => {
        reqObj.id = reqObj._id
        delete reqObj._id
        delete reqObj.__v
    }
})

module.exports = mongoose.model('Correo', correoSchema)
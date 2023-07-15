const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const authTokenSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true,
    },
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant',
        required: true,
    },
    validated: {
        type: Boolean,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    email: {
        type: String,
    }
})

authTokenSchema.plugin(uniqueValidator)

authTokenSchema.set('toJSON', {
    transform: (_, reqObj) => {
        reqObj.id = reqObj._id
        delete reqObj._id
        delete reqObj.__v
    }
})

module.exports = mongoose.model('authToken', authTokenSchema)
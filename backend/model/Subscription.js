const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const subSchema = new mongoose.Schema({
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant',
        required: true
    },
    value: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String, // El nombre debe ser único para el tenant al que pertenece la subscripción
        required: true
    },
    expires: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    limitCalls: {
        type: Number,
        required: true
    },
    enabled: {
        type: Boolean,
        required: true
    },
    uses: {
        type: Number,
        required: true
    },
    allowedDomains: [
        {
            type: String
        }
    ]
})

subSchema.plugin(uniqueValidator)

subSchema.set('toJSON', {
    transform: (_, reqObj) => {
        reqObj.id = reqObj._id
        delete reqObj._id
        delete reqObj.__v
    }
})

module.exports = mongoose.model('Subscription', subSchema)
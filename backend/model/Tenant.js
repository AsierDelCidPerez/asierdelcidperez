const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const tenSchema = new mongoose.Schema({
    nameId: {
        type: String,
        unique: true,
        required: true
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    subscriptions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subscription'
        }
    ],
    aditionals: {
        mfa: {
            type: Boolean
        }
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    features: [
        {
            type: String
        }
    ],
    subTenants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tenant'
        }
    ]
})

tenSchema.plugin(uniqueValidator)

tenSchema.set('toJSON', {
    transform: (_, reqObj) => {
        reqObj.id = reqObj._id
        delete reqObj._id
        delete reqObj.__v
    }
})

module.exports = mongoose.model('Tenant', tenSchema)
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
    features: [
        {
            type: String
        }
    ],
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
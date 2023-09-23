const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const { activarCifradoReposo } = require('../utils/encryptionCenter')
const { decrypt } = require('dotenv')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    apellidos: {
        type: String,
        required: true,
    },

    status: {
        type: Number,
        required: true,
        default: 0
    },

    email: {
        type: String, // El email será único por tenant
        required: true,
        //unique: true
    },
    imageIcon: {
        type: String,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant',
        required: true
    },
    rank: {
        type: String,
        ref: 'Rank',
        required: true,
    },
    blocked: {
        value: {
            type: mongoose.Schema.Types.Number,
            required: true
        },
        reason: {
            type: String
        }
    },
    createdOn: {
        type: mongoose.Schema.Types.Date,
        required: true
    }

})
userSchema.plugin(uniqueValidator)

userSchema.set('')

userSchema.set('toJSON', {
    transform: (_, reqObj) => {
        reqObj.id = reqObj._id
        delete reqObj._id
        delete reqObj.__v
        delete reqObj.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)
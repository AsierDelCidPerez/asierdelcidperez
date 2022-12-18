const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    apellidos: {
        type: String,
        required: true,
    },
    email: {
        unique: true,
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    }

})
userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (_, reqObj) => {
        delete reqObj._id
        delete reqObj.__v
        delete reqObj.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)
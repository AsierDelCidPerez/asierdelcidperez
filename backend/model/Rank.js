const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const rankSchema = new mongoose.Schema({
    nameId: {
        type: String,
        unique: true,
        required: true,
        ref: 'User'
    },
    allowedActions: [
        {
            type: String
        }
    ],
    priority: {
        type: Number,
        required: true
    }
})



rankSchema.plugin(uniqueValidator)

rankSchema.set('toJSON', {
    transform: (_, reqObj) => {
        reqObj.id = reqObj._id
        delete reqObj._id
        delete reqObj.__v
    }
})

module.exports = mongoose.model('Rank', rankSchema)
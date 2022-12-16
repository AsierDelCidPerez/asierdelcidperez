const mongoose = require('mongoose')

const user = new mongoose.Schema({
    username: {
        unique: true,
        type: String,
        required: true,
    },
    email: {
        unique: true,
        type: String,
        required: true,
    },

})
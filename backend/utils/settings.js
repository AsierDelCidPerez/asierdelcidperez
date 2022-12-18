require('dotenv').config()

const port = process.env.PORT || 3001
const MONGODB_URI = 'mongodb+srv://root:qGYFhp6L4t3RpHSk@cluster0.lvp4y.mongodb.net/asierdelcid?retryWrites=true&w=majority'
const SECRET = 'y^5ZfiMSVpHY8%dgc%dLQGRgvNb9Q&Cxk^A6@RL^XW^r2spW4k'

module.exports = {
    port, MONGODB_URI, SECRET
}
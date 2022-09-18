const persons = require('./bbdd')

const resolvers = {
    Query: {
        allPersons: () => persons
    }
}

module.exports = resolvers
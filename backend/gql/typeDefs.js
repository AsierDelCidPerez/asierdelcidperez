const {gql} = require('apollo-server-express')

const typeDefs = gql `
    type Person {
        name: String!,
        phone: String
    }
    type Query {
        allPersons: [Person]!
    }
`

module.exports = typeDefs
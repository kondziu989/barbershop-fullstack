const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Barber{
    IdB: Int
    name: String
    firstName: String
    lastName: String
    phone: String
    email: String
}

type Product{
    IdP: Int
    name: String
    category: String
    brand: String
    price: Float
    description: String
}

type Service{
    ids: Int
    name: String
    price: Float
    duration: Int
}

type AuthData {
    firstName: String
    token: String
    tokenExpiration: Int
}

input UserInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    phone: String
}

type User {
    idU: Int
    email: String
    firstName: String
    lastName: String
    phone: String
}

type RootQuery {
    barbers: [Barber!]!
    products: [Product!]!
    services: [Service!]!
    login(email: String!, password: String!) : AuthData
}

type RootMutation {
    register(userInput: UserInput!) : User
}

schema {
    query: RootQuery
    mutation: RootMutation
}

`);
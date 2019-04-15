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

type OrderProduct{
    IdP: Int
    name: String
    category: String
    brand: String
    price: Float
    description: String
    IdO: Int
    quantity: Int
}

type Order {
    IdO: Int
    status: String
    orderProducts: [OrderProduct!]!
    orderDate: String
    comment: String
    totalPrice: Float
}

input UserInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    phone: String
}

input OrderProductInput{
    IdP: Int
    quantity: Int
}

input OrderInput {
    orderProducts: [OrderProductInput!]!
    comment: String
}

type RootQuery {
    barbers: [Barber!]!
    products: [Product!]!
    services: [Service!]!
    login(email: String!, password: String!) : AuthData
    orders(token: String!) : [Order]
}

type RootMutation {
    register(userInput: UserInput!) : Boolean!
    makeOrder(token: String!, order: OrderInput!): Boolean!
}

schema {
    query: RootQuery
    mutation: RootMutation
}

`);
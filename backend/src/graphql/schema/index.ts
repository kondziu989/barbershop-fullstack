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

type Reservation {
    idr: Int
    barbername: String
    service: String
    date: String
    status: String
    price: Float
    comment: String
    duration: Int
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

input ReservationData {
    date: String
    IdB: Int
    IdS: Int
    comment: String
}

type RootQuery {
    barbers: [Barber!]!
    products: [Product!]!
    services: [Service!]!
    login(email: String!, password: String!) : AuthData
    orders(token: String!, status: String!) : [Order]
    reservations(token: String!, status: String!): [Reservation]
    freeReservationsMonth(barberId: Int,serviceId: Int, date: String): [String]
    freeReservationsDay(barberId: Int,serviceId: Int, date: String): [String]
    allReservations(token: String!, status: String!): [Reservation]
    allOrders(token: String!, status: String!): [Order]
}

type RootMutation {
    register(userInput: UserInput!) : Boolean!
    makeOrder(token: String!, order: OrderInput!): Boolean!
    makeReservation(token: String!, reservationData: ReservationData!): Boolean
    confirmReservation(token: String!, reservation: Int!): Reservation
    confirmOrder(token: String!, order: Int!): Order
}

schema {
    query: RootQuery
    mutation: RootMutation
}

`);
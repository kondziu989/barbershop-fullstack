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

type RootQuery {
    barbers: [Barber!]!
    products: [Product!]!
    services: [Service!]!
}

schema {
    query: RootQuery
}

`);
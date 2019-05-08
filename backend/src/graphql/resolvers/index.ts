const barberResolver = require('./barber');
const productResolver = require('./product');
const serviceResolver = require('./service');
const userResolver = require('./auth');
const orderResolver = require("./order");
const reservationResolver = require("./reservation")

const rootResolver = {
    ...barberResolver,
    ...productResolver,
    ...serviceResolver,
    ...userResolver,
    ...orderResolver,
    ...reservationResolver
}

module.exports = rootResolver;
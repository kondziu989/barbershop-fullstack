const barberResolver = require('./barber');
const productResolver = require('./product');
const serviceResolver = require('./service');
const userResolver = require('./auth');
const orderResolver = require("./order");

const rootResolver = {
    ...barberResolver,
    ...productResolver,
    ...serviceResolver,
    ...userResolver,
    ...orderResolver
}

module.exports = rootResolver;
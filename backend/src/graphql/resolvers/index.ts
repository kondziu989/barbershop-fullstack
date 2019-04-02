const barberResolver = require('./barber');
const productResolver = require('./product');
const serviceResolver = require('./service');
const userResolver = require('./auth');

const rootResolver = {
    ...barberResolver,
    ...productResolver,
    ...serviceResolver,
    ...userResolver
}

module.exports = rootResolver;
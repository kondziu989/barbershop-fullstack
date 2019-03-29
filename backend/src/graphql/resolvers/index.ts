const barberResolver = require('./barber');
const productResolver = require('./product');
const serviceResolver = require('./service');

const rootResolver = {
    ...barberResolver,
    ...productResolver,
    ...serviceResolver
}

module.exports = rootResolver;
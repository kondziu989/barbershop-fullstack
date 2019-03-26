const barberResolver = require('./barber');
const productResolver = require('./product');

const rootResolver = {
    ...barberResolver,
    ...productResolver
}

module.exports = rootResolver;
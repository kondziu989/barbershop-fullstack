const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'twierdza1',
        database: 'BarberShop'
    }
  });

export default db;
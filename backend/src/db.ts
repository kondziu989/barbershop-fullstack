const knex = require('knex');

const connection = {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'twierdza1',
    database : 'BarberShop'
}
const db = knex({
    client: 'pg',
    debug: true,
    connection: process.env.DATABASE_URL || connection,
    ssl: true
  });

export default db;
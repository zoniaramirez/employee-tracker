const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'employees_db',
    password: '',
});

client.connect();

module.exports = client;
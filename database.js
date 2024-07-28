const { Client } = require('pg');// Import the Client class from the 'pg' module

// Create a new instance of the Client class with the database connection details
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'employees_db',
    password: '',
});

// Connect to the database
client.connect();

// Export the client instance to be used in other parts of the application
module.exports = client;
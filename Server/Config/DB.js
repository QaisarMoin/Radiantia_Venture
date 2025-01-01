const mysql = require('mysql');
require('dotenv').config();

// Create the MySQL connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL Database:', err.message);
        return;
    }
    console.log('Connected to MySQL Database', connection.threadId, connection.config.database);
});

module.exports = connection;

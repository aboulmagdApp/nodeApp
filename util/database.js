const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1:3306',
    user: 'root',
    database : 'node-complete',
    password: 'aboulmagd@Apps'
});

module.exports = pool.promise();
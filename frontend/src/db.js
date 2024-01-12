const mysql = require('mysql');
const { Connection } = require('promise-mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'ResPHAL',
});

const connection = db.getConnection();

db.getConnection((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database');
});

module.exports = db;
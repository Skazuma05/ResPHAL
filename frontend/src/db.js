const mysql = require('mysql');

const db = mysql.createPool({
  host: 'localhost',
  user: 'kazuma',
  password: 'password',
  database: 'ResPHAL',
});

db.getConnection((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database');
});

module.exports = db;
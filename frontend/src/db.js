const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'kazuma',
  password: 'password',
  database: 'ResPHAL',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database');
});

module.exports = db;
const mysql = require('mysql2');
require('dotenv').config(); 


const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'BrenoJLeal1!',
  database: process.env.DB_NAME || 'user_management',
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

module.exports = db;

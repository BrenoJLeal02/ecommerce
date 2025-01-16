const mysql = require('mysql2');
require('dotenv').config();  // Para carregar as variáveis de ambiente

// Configuração da conexão com o banco de dados usando variáveis de ambiente
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'BrenoJLeal1!',  // Não deixe a senha em branco, configure no .env
  database: process.env.DB_NAME || 'user_management',
});

// Conexão com o banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);  // Encerra o servidor caso a conexão falhe
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

module.exports = db;

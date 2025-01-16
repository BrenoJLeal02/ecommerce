const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');  // Importa a configuração do banco de dados
const authRoutes = require('./routes/authRoutes');

dotenv.config();  // Carregar variáveis de ambiente do .env

const app = express();

// Middlewares
app.use(cors()); // Permite requisições de outros domínios
app.use(express.json()); // Para tratar o corpo das requisições como JSON

// Definir as rotas
app.use('/user', authRoutes);  // Rota de autenticação

// Testa a conexão com o banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);  // Caso não consiga conectar, o servidor é encerrado
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

// Configuração da porta e início do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

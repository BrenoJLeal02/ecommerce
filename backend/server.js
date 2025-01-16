const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');  
const authRoutes = require('./routes/authRoutes');

dotenv.config();  

const app = express();


app.use(cors());
app.use(express.json()); 


app.use('/user', authRoutes);  


db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1); 
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

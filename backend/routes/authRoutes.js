const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');  // Importando o middleware

// Rota para registrar um novo usuário
router.post('/register', async (req, res) => {
  try {
    await authController.register(req, res);
  } catch (error) {
    console.error('Erro ao registrar:', error);
    res.status(500).json({ message: 'Erro ao realizar o registro' });
  }
});

// Rota para login de um usuário
router.post('/login', async (req, res) => {
  try {
    await authController.login(req, res);
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro ao realizar o login' });
  }
});

// Rota para recuperação de senha
router.post('/forgot', async (req, res) => {
  try {
    await authController.forgotPassword(req, res);
  } catch (error) {
    console.error('Erro ao recuperar a senha:', error);
    res.status(500).json({ message: 'Erro ao recuperar a senha' });
  }
});

// Rota para listar todos os usuários (protegida)
router.get('/users', authenticateToken, async (req, res) => {  // Protegendo a rota
  try {
    await authController.getAllUsers(req, res);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
});

module.exports = router;

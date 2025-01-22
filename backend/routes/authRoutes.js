const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware'); 


const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Acesso negado. Permissões insuficientes.' });
    }
    next();
  };
};

router.post('/register', async (req, res) => {
  try {
    await authController.register(req, res);
  } catch (error) {
    console.error('Erro ao registrar:', error);
    res.status(500).json({ message: 'Erro ao realizar o registro' });
  }
});

router.post('/login', async (req, res) => {
  try {
    await authController.login(req, res);
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro ao realizar o login' });
  }
});

router.post('/forgot', async (req, res) => {
  try {
    await authController.forgotPassword(req, res);
  } catch (error) {
    console.error('Erro ao recuperar a senha:', error);
    res.status(500).json({ message: 'Erro ao recuperar a senha' });
  }
});


router.get('/users', authenticateToken, authorizeRole('Admin'), async (req, res) => { 
  try {
    await authController.getAllUsers(req, res);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
});

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    res.status(200).json({ 
      message: `Bem-vindo, ${req.user.username}!`,
      role: req.user.role,
    });
  } catch (error) {
    console.error('Erro ao obter o perfil:', error);
    res.status(500).json({ message: 'Erro ao obter o perfil' });
  }
});

module.exports = router;

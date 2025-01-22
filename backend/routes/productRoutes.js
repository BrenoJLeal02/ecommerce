const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticateToken = require('../middleware/authMiddleware'); // Middleware de autenticação

// Middleware para autorizar baseado no role
const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Acesso negado. Permissões insuficientes.' });
    }
    next();
  };
};

// Rota para buscar produtos (acessível para todos)
router.get('/', async (req, res) => {
  try {
    await productController.getAllProducts(req, res);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ message: 'Erro ao buscar produtos' });
  }
});

// Rota para criar produto (restrita a Admin)
// Rota para criar produto (restrita a Admin)
router.post(
  '/create',
  authenticateToken,         // Verifica o token
  authorizeRole('Admin'),    // Verifica o papel do usuário
  productController.uploadImage,
  async (req, res) => {
    try {
      await productController.addProduct(req, res);
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      res.status(500).json({ message: 'Erro ao adicionar produto' });
    }
  }
);

// Rota para buscar produtos por categoria
router.get('/category/:categoryId', async (req, res) => {
  try {
    await productController.getProductsByCategory(req, res);
  } catch (error) {
    console.error('Erro ao buscar produtos por categoria:', error);
    res.status(500).json({ message: 'Erro ao buscar produtos por categoria' });
  }
});


module.exports = router;

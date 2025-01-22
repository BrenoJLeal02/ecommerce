const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticateToken = require('../middleware/authMiddleware'); 

const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Acesso negado. Permissões insuficientes.' });
    }
    next();
  };
};

router.get('/', async (req, res) => {
  try {
    await productController.getAllProducts(req, res);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ message: 'Erro ao buscar produtos' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    await productController.getProductById(req, res);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ message: 'Erro ao buscar produto' });
  }
});

router.post(
  '/create',
  authenticateToken,        
  authorizeRole('Admin'),    
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

router.get('/category/:categoryId', async (req, res) => {
  try {
    await productController.getProductsByCategory(req, res);
  } catch (error) {
    console.error('Erro ao buscar produtos por categoria:', error);
    res.status(500).json({ message: 'Erro ao buscar produtos por categoria' });
  }
});


module.exports = router;

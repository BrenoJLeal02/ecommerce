// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', async (req, res) => {
  try {
    await productController.getAllProducts(req, res);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ message: 'Erro ao buscar produtos' });
  }
});

router.post('/create', async (req, res) => {
  try {
    await productController.addProduct(req, res);
  } catch (error) {
    console.error('Erro ao adicionar produto:', error);
    res.status(500).json({ message: 'Erro ao adicionar produto' });
  }
});

module.exports = router;

// backend/routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');  // Verifique o caminho aqui

// Defina as rotas para categorias
router.get('/', categoryController.getCategories);
router.post('/', categoryController.addCategory);

module.exports = router;

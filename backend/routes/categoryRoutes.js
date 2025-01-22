// backend/routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');  // Verifique o caminho aqui

// Defina as rotas para categorias
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);  // Nova rota para buscar categoria por ID
router.post('/create', categoryController.addCategory);

module.exports = router;

// backend/routes/establishmentRoutes.js
const express = require('express');
const router = express.Router();
const establishmentController = require('../controllers/establishmentController');

router.get('/', async (req, res) => {
  try {
    await establishmentController.getAllEstablishments(req, res);
  } catch (error) {
    console.error('Erro ao buscar estabelecimentos:', error);
    res.status(500).json({ message: 'Erro ao buscar estabelecimentos' });
  }
});

module.exports = router;

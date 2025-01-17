// backend/controllers/establishmentController.js
const db = require('../config/db');

exports.getAllEstablishments = (req, res) => {
  db.query('SELECT * FROM establishments', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar estabelecimentos.' });
    }

    res.status(200).json({ establishments: results });
  });
};

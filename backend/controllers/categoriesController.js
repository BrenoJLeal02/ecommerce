const db = require('../config/db');
// Backend - Rota para obter categorias
exports.getCategories = (req, res) => {
    db.query('SELECT id, name FROM categories', (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao buscar categorias.' });
      }
      res.status(200).json({ categories: results });
    });
  };
  
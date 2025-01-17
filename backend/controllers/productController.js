// backend/controllers/productController.js
const db = require('../config/db');

exports.getAllProducts = (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar produtos.' });
    }

    res.status(200).json({ products: results });
  });
};

exports.addProduct = (req, res) => {
  const { name, price, description } = req.body;

  // Verifica se os campos obrigatórios foram fornecidos
  if (!name || !price) {
    return res.status(400).json({ message: 'Nome e preço do produto são obrigatórios.' });
  }

  db.query(
    'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
    [name, price, description],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao adicionar produto.' });
      }

      res.status(201).json({ message: 'Produto adicionado com sucesso.' });
    }
  );
};

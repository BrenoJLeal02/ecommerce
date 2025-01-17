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
  const { name, price, description, establishment_id } = req.body;

  if (!name || !price || !establishment_id) {
    console.log('Campos obrigatórios não fornecidos');
    return res.status(400).json({ message: 'Nome, preço e estabelecimento são obrigatórios.' });
  }

  db.query(
    'INSERT INTO products (name, price, description, establishment_id) VALUES (?, ?, ?, ?)',
    [name, price, description, establishment_id],
    (err, results) => {
      if (err) {
        console.log('Erro ao inserir no banco:', err);  // Log de erro do banco
        return res.status(500).json({ message: 'Erro ao adicionar produto.' });
      }

      console.log('Produto adicionado:', results);
      res.status(201).json({ message: 'Produto adicionado com sucesso.' });
    }
  );
};

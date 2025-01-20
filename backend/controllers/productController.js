
const db = require('../config/db');

// backend/controllers/productController.js
exports.getAllProducts = (req, res) => {
  const query = `
    SELECT p.id, p.name, p.description, p.price, p.stock, c.name AS category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar produtos.' });
    }

    res.status(200).json({ products: results });
  });
};


exports.addProduct = (req, res) => {
  const { name, price, description, stock, establishment_id, category_id } = req.body;

  // Verificação de campos obrigatórios
  if (!name || !price || !establishment_id || category_id === undefined) {
    console.log('Campos obrigatórios não fornecidos');
    return res.status(400).json({ message: 'Nome, preço, estabelecimento e categoria são obrigatórios.' });
  }

  // Modifique a consulta para incluir category_id
  db.query(
    'INSERT INTO products (name, price, description, stock, establishment_id, category_id) VALUES (?, ?, ?, ?, ?, ?)', 
    [name, price, description, stock || 0, establishment_id, category_id], 
    (err, results) => {
      if (err) {
        console.log('Erro ao inserir no banco:', err);
        return res.status(500).json({ message: 'Erro ao adicionar produto.' });
      }

      console.log('Produto adicionado:', results);
      res.status(201).json({ message: 'Produto adicionado com sucesso.' });
    }
  );
};


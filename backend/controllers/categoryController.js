// backend/controllers/categoryController.js
const db = require('../config/db');

// Função para buscar todas as categorias
exports.getCategories = (req, res) => {
  db.query('SELECT * FROM categories', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar categorias.' });
    }

    res.status(200).json({ categories: results });
  });
};

// Função para adicionar uma nova categoria
exports.addCategory = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Nome da categoria é obrigatório.' });
  }

  db.query('INSERT INTO categories (name) VALUES (?)', [name], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao adicionar categoria.' });
    }

    res.status(201).json({ message: 'Categoria adicionada com sucesso.' });
  });
};

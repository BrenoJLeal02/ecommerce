const db = require('../config/db');

exports.getCategories = (req, res) => {
  db.query('SELECT * FROM categories', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar categorias.' });
    }
    res.status(200).json({ categories: results });
  });
};

exports.getCategoryById = (req, res) => {
  const categoryId = req.params.id;

  db.query('SELECT * FROM categories WHERE id = ?', [categoryId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar a categoria.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Categoria não encontrada.' });
    }

    res.status(200).json({ category: results[0] });
  });
};


exports.addCategory = (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Nome da categoria é obrigatório.' });
  }

  const query = 'INSERT INTO categories (name, description) VALUES (?, ?)';
  const values = [name, description || null];

  db.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao adicionar categoria.' });
    }

    res.status(201).json({ message: 'Categoria adicionada com sucesso.' });
  });
};


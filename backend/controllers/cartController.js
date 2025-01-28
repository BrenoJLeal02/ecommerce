// backend/controllers/cartController.js
const db = require('../config/db');  // Conexão com o banco de dados

// Adicionar item ao carrinho
exports.addItemToCart = (req, res) => {
  const { userId, productId, quantity } = req.body;
  
  const query = `SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?`;
  db.query(query, [userId, productId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao verificar item no carrinho', error: err });
    }

    if (result.length > 0) {
      // Item já existe no carrinho, atualiza a quantidade
      const newQuantity = result[0].quantity + quantity;
      const updateQuery = `UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?`;
      db.query(updateQuery, [newQuantity, userId, productId], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Erro ao atualizar item no carrinho', error: err });
        }
        return res.status(200).json({ message: 'Quantidade atualizada no carrinho' });
      });
    } else {
      // Item não existe no carrinho, adiciona novo item
      const insertQuery = `INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)`;
      db.query(insertQuery, [userId, productId, quantity], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Erro ao adicionar item ao carrinho', error: err });
        }
        return res.status(201).json({ message: 'Item adicionado ao carrinho', itemId: result.insertId });
      });
    }
  });
};

// Remover item do carrinho
exports.removeItemFromCart = (req, res) => {
  const { userId, productId } = req.params;
  
  const query = `DELETE FROM cart_items WHERE user_id = ? AND product_id = ?`;
  db.query(query, [userId, productId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao remover item do carrinho', error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Item não encontrado no carrinho' });
    }

    return res.status(200).json({ message: 'Item removido do carrinho' });
  });
};

// Obter itens do carrinho de um usuário
// Obter itens do carrinho de um usuário
exports.getCartItems = (req, res) => {
    const { userId } = req.params;
  
    // Atualize a consulta para incluir os detalhes do produto
    const query = `
      SELECT ci.user_id, ci.product_id, ci.quantity, p.name, p.price
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ?
    `;
    
    db.query(query, [userId], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao obter itens do carrinho', error: err });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ message: 'Carrinho vazio' });
      }
  
      return res.status(200).json(result);
    });
  };
  
  exports.updateItemQuantity = (req, res) => {
    const { userId, productId, quantity } = req.body;
  
    if (quantity < 1) {
      return res.status(400).json({ message: 'A quantidade deve ser maior que 0.' });
    }
  
    const query = `SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?`;
    db.query(query, [userId, productId], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao verificar item no carrinho', error: err });
      }
  
      if (result.length > 0) {
        // Item já existe no carrinho, atualiza a quantidade
        const updateQuery = `UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?`;
        db.query(updateQuery, [quantity, userId, productId], (err, result) => {
          if (err) {
            return res.status(500).json({ message: 'Erro ao atualizar item no carrinho', error: err });
          }
          return res.status(200).json({ message: 'Quantidade atualizada no carrinho' });
        });
      } else {
        return res.status(404).json({ message: 'Item não encontrado no carrinho' });
      }
    });
  };
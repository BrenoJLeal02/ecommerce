const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.register = (req, res) => {
  const { email, username, password, name, role = 'Client' } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'A senha é obrigatória.' });
  }

  if (!name) {
    return res.status(400).json({ message: 'O nome completo é obrigatório.' });
  }


  if (!['Admin', 'Client'].includes(role)) {
    return res.status(400).json({ message: 'Role inválida. Use "Admin" ou "Client".' });
  }


  db.query('SELECT * FROM users WHERE email = ? OR username = ?', [email, username], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao verificar usuário existente.' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Email ou nome de usuário já cadastrados.' });
    }

  
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao criptografar a senha.' });
      }

      
      db.query(
        'INSERT INTO users (email, username, password, name, role) VALUES (?, ?, ?, ?, ?)',
        [email, username, hashedPassword, name, role],
        (err, results) => {
          if (err) {
            return res.status(500).json({ message: 'Erro ao salvar o usuário.' });
          }

          res.status(201).json({ message: 'Usuário registrado com sucesso.', role });
        }
      );
    });
  });
};


exports.login = (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar usuário.' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Usuário não encontrado.' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao comparar senhas.' });
      }

      if (!isMatch) {
        return res.status(400).json({ message: 'Senha incorreta.' });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role }, 
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({ message: 'Login bem-sucedido!', token });
    });
  });
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar email.' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Email não encontrado.' });
    }

    res.status(200).json({ message: 'Instruções para recuperação de senha enviadas para o seu email.' });
  });
};

exports.getAllUsers = (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao buscar usuários.' });
      }
  
      res.status(200).json({ users: results });
    });
  };
  
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Pega o token da requisição
  const token = req.header('Authorization')?.split(' ')[1];  // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  // Verifica e decodifica o token
  jwt.verify(token, 'secretKey', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido.' });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Obtém o cabeçalho Authorization
  const token = authHeader && authHeader.split(' ')[1]; // Extrai o token após "Bearer"

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido ou expirado.' });
    }

    req.user = user; // Armazena o usuário decodificado no objeto req
    next();
  });
};

module.exports = authenticateToken;

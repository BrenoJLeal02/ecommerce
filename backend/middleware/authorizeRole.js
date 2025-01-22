const authorizeRole = (role) => {
    return (req, res, next) => {
      if (req.user.role !== role) {
        return res.status(403).json({ message: 'Acesso negado. Permissões insuficientes.' });
      }
      next();
    };
  };
  
  router.get('/admin', authenticateToken, authorizeRole('Admin'), (req, res) => {
    res.status(200).json({ message: 'Bem-vindo, Admin!' });
  });
  

  router.get('/profile', authenticateToken, (req, res) => {
    res.status(200).json({ message: `Bem-vindo, ${req.user.username}`, role: req.user.role });
  });
  
const db = require('../config/db');
const multer = require('multer');
const path = require('path');

// Configuração do multer para armazenar as imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Diretório onde as imagens serão armazenadas
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Extensão da imagem
    const fileName = Date.now() + ext; // Nome único para cada imagem
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

exports.getAllProducts = (req, res) => {
  const query = `
    SELECT p.id, p.name, p.description, p.price, p.stock, c.name AS category_name, p.image_path
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
  const image = req.file ? req.file.filename : null; // Pega o nome do arquivo se houver

  // Verificação de campos obrigatórios
  if (!name || !price || !establishment_id || category_id === undefined) {
    console.log('Campos obrigatórios não fornecidos');
    return res.status(400).json({ message: 'Nome, preço, estabelecimento e categoria são obrigatórios.' });
  }

  // Modifique a consulta para incluir o image_path
  db.query(
    'INSERT INTO products (name, price, description, stock, establishment_id, category_id, image_path) VALUES (?, ?, ?, ?, ?, ?, ?)', 
    [name, price, description, stock || 0, establishment_id, category_id, image], 
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
exports.getProductsByCategory = (req, res) => {
  const { categoryId } = req.params;

  const query = `
    SELECT p.id, p.name, p.description, p.price, p.stock, c.name AS category_name, p.image_path
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.category_id = ?
  `;

  db.query(query, [categoryId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar produtos por categoria.' });
    }

    res.status(200).json({ products: results });
  });
};

// Expor o middleware de upload para uso nas rotas
exports.uploadImage = upload.single('image');

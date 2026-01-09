// middleware/auth.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  if (!SECRET_KEY) {
    console.error('JWT_SECRET manquant');
    return res.status(500).json({ error: 'Configuration serveur invalide' });
  }

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Accès non autorisé' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Accès non autorisé' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = authenticateToken;

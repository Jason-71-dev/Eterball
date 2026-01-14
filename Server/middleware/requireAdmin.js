// middleware/requireAdmin.js
module.exports = function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Acces reserve administrateur' });
  }
  return next();
};
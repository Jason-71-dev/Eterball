const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;
const User = require('../models/User');
const authenticateToken = require('../middleware/auth');

// GET /account/inventory
router.get('/inventory', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: 'Non autorisé.' });

    const user = await User.findById(userId)
      .populate('inventory') // récupère les objets Item complets
      .select('inventory balance pseudo identifier email');

    if (!user)
      return res.status(404).json({ message: 'Utilisateur introuvable.' });

    return res.status(200).json({
      balance: user.balance,
      inventory: user.inventory,
    });
  } catch (err) {
    console.error('GET /account/inventory ERROR:', err);
    return res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = router;

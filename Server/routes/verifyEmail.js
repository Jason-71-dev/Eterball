const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

router.get('/verify-email', async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) return res.status(400).json({ message: 'Token manquant' });

    const payload = jwt.verify(token, process.env.JWT_EMAIL_SECRET);

    const user = await User.findById(payload.userId);
    if (!user)
      return res.status(404).json({ message: 'Utilisateur introuvable' });

    user.isVerified = true;
    await user.save();

    if (user.isVerified) {
      return res.status(200).json({ message: 'Email déjà vérifié ✅' });
    }

    return res.status(200).json({ message: 'Email vérifié ' });
  } catch (e) {
    return res.status(400).json({ message: 'Lien invalide ou expiré' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const { sendVerificationEmail } = require('../services/emailService');

router.post('/signup', async (req, res) => {
  const { username, surname, email, password, birthDate } = req.body;

  if (!username || !surname || !email || !password || !birthDate) {
    return res.status(400).json({
      error:
        'Nom, prénom, email, mot de passe et date de naissance sont requis',
    });
  }

  try {
    const existing = await User.findOne({ email: email.trim().toLowerCase() });
    if (existing) {
      return res.status(400).json({ error: 'Utilisateur déjà existant' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      surname,
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      birthDate: new Date(birthDate),
      isVerified: false,
    });

    await newUser.save();

    if (!process.env.JWT_EMAIL_SECRET) {
      console.error('JWT_EMAIL_SECRET is missing');
      return res
        .status(500)
        .json({ error: 'Config serveur manquante (email secret)' });
    }

    if (!process.env.CLIENT_URL) {
      console.error('CLIENT_URL is missing');
      return res
        .status(500)
        .json({ error: 'Config serveur manquante (client url)' });
    }

    // Token email (différent du token de login)
    const emailToken = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_EMAIL_SECRET,
      { expiresIn: '24h' }
    );

    const verifyUrl = `${
      process.env.CLIENT_URL
    }/verify?token=${encodeURIComponent(emailToken)}`;

    // ✅ Envoi via Gmail SMTP
    await sendVerificationEmail({ to: newUser.email, verifyUrl });

    return res.status(201).json({
      message: 'Utilisateur créé. Un email de confirmation a été envoyé.',
    });
  } catch (err) {
    console.error('Erreur signup:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;

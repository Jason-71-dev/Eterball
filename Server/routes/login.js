const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendVerificationEmail } = require('../services/emailService');

const SECRET_KEY = process.env.JWT_SECRET;

// (Optionnel) anti-spam simple en mémoire (reset au redémarrage)
// clé = email, valeur = timestamp dernier envoi
const resendCooldown = new Map();
const RESEND_COOLDOWN_MS = 60 * 1000; // 60s

router.post('/login', async (req, res) => {
  try {
    const username = String(req.body?.username ?? '').trim();
    const password = String(req.body?.password ?? '');

    if (!username || !password) {
      return res.status(400).json({
        error: 'Username and password are required',
      });
    }

    // connexion insensible à la casse :
    // const user = await User.findOne({ username: username.toLowerCase() });
    const user = await User.findOne({ username });

    // message neutre
    if (!user) {
      return res.status(401).json({
        error: "Nom d'utilisateur ou mot de passe incorrect",
      });
    }

    // ✅ Email non vérifié
    if (!user.isVerified) {
      return res.status(403).json({
        error: 'Merci de confirmer ton email avant de te connecter.',
        code: 'EMAIL_NOT_VERIFIED',
        // pratique côté front : pré-remplir pour le bouton resend
        email: user.email,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        error: "Nom d'utilisateur ou mot de passe incorrect",
      });
    }

    if (!SECRET_KEY) {
      console.error('JWT_SECRET is missing');
      return res.status(500).json({ error: 'Config serveur manquante (JWT)' });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      SECRET_KEY,
      { expiresIn: '2h' }
    );

    return res.status(200).json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    console.error('Erreur login:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.post('/resend-verification', async (req, res) => {
  try {
    const email = String(req.body?.email ?? '')
      .trim()
      .toLowerCase();

    if (!email) {
      return res.status(400).json({ error: 'Email requis' });
    }

    // Optionnel: cooldown anti spam
    const last = resendCooldown.get(email);
    const now = Date.now();
    if (last && now - last < RESEND_COOLDOWN_MS) {
      return res.status(429).json({
        error: 'Attends un peu avant de renvoyer un email.',
        code: 'RESEND_COOLDOWN',
      });
    }

    const user = await User.findOne({ email });

    //  Réponse neutre même si pas trouvé (sécurité)
    if (!user) {
      return res.status(200).json({
        message: 'Si un compte existe, un email de confirmation a été renvoyé.',
      });
    }

    if (user.isVerified) {
      return res.status(200).json({
        message: 'Ton email est déjà vérifié ✅',
      });
    }

    await sendVerificationEmail({ to: user.email, userId: user._id });

    resendCooldown.set(email, now);

    return res.status(200).json({
      message: 'Email de confirmation renvoyé. Vérifie ta boîte mail.',
    });
  } catch (err) {
    console.error('Erreur resend-verification:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;

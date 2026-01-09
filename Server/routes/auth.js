const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

// Helpers
function normalizeEmail(email) {
  return String(email || '')
    .trim()
    .toLowerCase();
}

function normalizeIdentifier(identifier) {
  return String(identifier || '')
    .trim()
    .toLowerCase();
}

function normalizePseudo(pseudo) {
  return String(pseudo || '').trim();
}

router.post('/signup', async (req, res) => {
  const {
    identifier,
    firstName,
    lastName,
    pseudo,
    email,
    password,
    birthDate,
  } = req.body;

  if (
    !identifier ||
    !firstName ||
    !lastName ||
    !pseudo ||
    !email ||
    !password ||
    !birthDate
  ) {
    return res.status(400).json({
      message:
        'Champs requis : identifiant, prénom, nom, pseudo, email, mot de passe, date de naissance.',
    });
  }

  const cleanIdentifier = normalizeIdentifier(identifier);
  const cleanEmail = normalizeEmail(email);
  const cleanPseudo = normalizePseudo(pseudo);

  try {
    // ✅ check doublons (identifiant OU email OU pseudo)
    const existing = await User.findOne({
      $or: [
        { identifier: cleanIdentifier },
        { email: cleanEmail },
        { pseudo: cleanPseudo },
      ],
    });

    if (existing) {
      // on renvoie un message précis si possible
      if (existing.identifier === cleanIdentifier) {
        return res.status(409).json({
          message: 'Identifiant déjà utilisé',
          field: 'identifier',
        });
      }
      if (existing.email === cleanEmail) {
        return res.status(409).json({
          message: 'Email déjà utilisé',
          field: 'email',
        });
      }
      if (existing.pseudo === cleanPseudo) {
        return res.status(409).json({
          message: 'Pseudo déjà utilisé',
          field: 'pseudo',
        });
      }

      return res.status(409).json({ message: 'Utilisateur déjà existant' });
    }

    // ✅ hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      identifier: cleanIdentifier,
      firstName: String(firstName).trim(),
      lastName: String(lastName).trim(),
      pseudo: cleanPseudo,
      email: cleanEmail,
      password: hashedPassword,
      birthDate: new Date(birthDate),
      // balance et inventory ont des defaults
    });

    await newUser.save();

    return res.status(201).json({
      message: 'Compte créé avec succès',
      user: {
        id: newUser._id,
        identifier: newUser.identifier,
        pseudo: newUser.pseudo,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error('Erreur signup:', err);

    // ✅ sécurité si index unique déclenche E11000
    if (err?.code === 11000) {
      const key = Object.keys(err.keyPattern || {})[0];
      const field = key || 'unknown';

      const msgMap = {
        identifier: 'Identifiant déjà utilisé',
        email: 'Email déjà utilisé',
        pseudo: 'Pseudo déjà utilisé',
      };

      return res.status(409).json({
        message: msgMap[field] || 'Champ déjà utilisé',
        field,
      });
    }

    return res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res
      .status(400)
      .json({ message: 'Identifiant et mot de passe requis.' });
  }

  try {
    const cleanIdentifier = normalizeIdentifier(identifier);

    console.log('[LOGIN] identifier raw:', identifier);
    console.log('[LOGIN] identifier clean:', cleanIdentifier);

    const user = await User.findOne({ identifier: cleanIdentifier });
    console.log('[LOGIN] user found:', !!user);

    if (!user) {
      return res.status(401).json({
        message: 'Identifiant introuvable',
        code: 'IDENTIFIER_NOT_FOUND',
      });
    }

    const ok = await bcrypt.compare(password, user.password);
    console.log('[LOGIN] password match:', ok);

    if (!ok) {
      return res.status(401).json({
        message: 'Mot de passe invalide',
        code: 'WRONG_PASSWORD',
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET manquant');
      return res
        .status(500)
        .json({ message: 'Config serveur manquante (JWT_SECRET)' });
    }

    const token = jwt.sign(
      { userId: user._id, identifier: user.identifier },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user._id,
        identifier: user.identifier,
        pseudo: user.pseudo,
        email: user.email,
        balance: user.balance,
      },
    });
  } catch (err) {
    console.error('Erreur login:', err);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;

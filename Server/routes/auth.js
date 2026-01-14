const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const UserStats = require('../models/UserStats'); // Ã¢Å“â€¦ AJOUT

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
        'Champs requis : identifiant, prÃƒÂ©nom, nom, pseudo, email, mot de passe, date de naissance.',
    });
  }

  const cleanIdentifier = normalizeIdentifier(identifier);
  const cleanEmail = normalizeEmail(email);
  const cleanPseudo = normalizePseudo(pseudo);

  try {
    // Ã¢Å“â€¦ check doublons (identifiant OU email OU pseudo)
    const existing = await User.findOne({
      $or: [
        { identifier: cleanIdentifier },
        { email: cleanEmail },
        { pseudo: cleanPseudo },
      ],
    });

    if (existing) {
      if (existing.identifier === cleanIdentifier) {
        return res.status(409).json({
          message: 'Identifiant dÃƒÂ©jÃƒÂ  utilisÃƒÂ©',
          field: 'identifier',
        });
      }
      if (existing.email === cleanEmail) {
        return res.status(409).json({
          message: 'Email dÃƒÂ©jÃƒÂ  utilisÃƒÂ©',
          field: 'email',
        });
      }
      if (existing.pseudo === cleanPseudo) {
        return res.status(409).json({
          message: 'Pseudo dÃƒÂ©jÃƒÂ  utilisÃƒÂ©',
          field: 'pseudo',
        });
      }

      return res.status(409).json({ message: 'Utilisateur dÃƒÂ©jÃƒÂ  existant' });
    }

    // Ã¢Å“â€¦ hash password
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
      // avatarURL a un default '' si tu l'as ajoutÃƒÂ© au model
    });

    await newUser.save();

    // Ã¢Å“â€¦ AJOUT : crÃƒÂ©er les stats par dÃƒÂ©faut (anti-doublon via upsert)
    await UserStats.findOneAndUpdate(
      { user: newUser._id },
      {
        $setOnInsert: {
          user: newUser._id,
          server: 'Dragos', // Ã°Å¸â€Â´ change si tu as un choix de serveur au signup
          class: 'Milieu', // Ã°Å¸â€Â´ change si tu as un choix de classe au signup
          levelGen: 1,
          matches: 0,
          successPoints: 0,
          season: 1,
        },
      },
      { upsert: true, new: true }
    );

    return res.status(201).json({
      message: 'Compte crÃƒÂ©ÃƒÂ© avec succÃƒÂ¨s',
      user: {
        id: newUser._id,
        identifier: newUser.identifier,
        pseudo: newUser.pseudo,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error('Erreur signup:', err);

    if (err?.code === 11000) {
      const key = Object.keys(err.keyPattern || {})[0];
      const field = key || 'unknown';

      const msgMap = {
        identifier: 'Identifiant dÃƒÂ©jÃƒÂ  utilisÃƒÂ©',
        email: 'Email dÃƒÂ©jÃƒÂ  utilisÃƒÂ©',
        pseudo: 'Pseudo dÃƒÂ©jÃƒÂ  utilisÃƒÂ©',
      };

      return res.status(409).json({
        message: msgMap[field] || 'Champ dÃƒÂ©jÃƒÂ  utilisÃƒÂ©',
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
      { userId: user._id, identifier: user.identifier, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      message: 'Connexion rÃƒÂ©ussie',
      token,
      user: {
        id: user._id,
        identifier: user.identifier,
        pseudo: user.pseudo,
        email: user.email,
        role: user.role,
        balance: user.balance,
      },
    });
  } catch (err) {
    console.error('Erreur login:', err);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;

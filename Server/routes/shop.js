const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const User = require('../models/User');
const authenticateToken = require('../middleware/auth'); // ✅ JWT middleware

// ✅ GET /shop/items (public)
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    return res.status(200).json(items);
  } catch (err) {
    console.error('GET /shop/items ERROR:', err);
    return res.status(500).json({
      message: 'Erreur serveur lors de la récupération des items.',
    });
  }
});

// ✅ POST /shop/buy/:itemId (protected)
// IMPORTANT: userId vient du token, pas du body
router.post('/buy/:itemId', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Non autorisé.' });
    }

    const item = await Item.findById(req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Item non trouvé.' });

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });

    // ✅ Optionnel mais conseillé : éviter achat doublon
    const alreadyOwned = user.inventory.some(
      (id) => id.toString() === item._id.toString()
    );
    if (alreadyOwned) {
      return res
        .status(409)
        .json({ message: 'Item déjà dans ton inventaire.' });
    }

    if (user.balance < item.price) {
      return res.status(400).json({ message: 'Fonds insuffisants.' });
    }

    user.balance -= item.price;
    user.inventory.push(item._id);
    await user.save();

    return res.status(200).json({
      message: `Achat réussi ! ${item.name} a été ajouté à ton inventaire.`,
      newBalance: user.balance,
      inventory: user.inventory,
    });
  } catch (err) {
    console.error('POST /shop/buy ERROR:', err);
    return res.status(500).json({ message: "Erreur serveur lors de l'achat." });
  }
});

// ✅ POST /shop/items (protected)
// (Idéalement réservé admin, mais au minimum protégé par JWT)
router.post('/items', authenticateToken, async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    return res.status(201).json(newItem);
  } catch (err) {
    console.error('POST /shop/items ERROR:', err);
    return res
      .status(400)
      .json({ message: "Erreur lors de la création de l'item." });
  }
});

module.exports = router;

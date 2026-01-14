const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const User = require('../models/User');
const authenticateToken = require('../middleware/auth'); // JWT middleware
const requireAdmin = require('../middleware/requireAdmin');

// GET /shop/items (public)
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    return res.status(200).json(items);
  } catch (err) {
    console.error('GET /shop/items ERROR:', err);
    return res.status(500).json({
      message: 'Erreur serveur lors de la rÃ©cupÃ©ration des items.',
    });
  }
});

// POST /shop/buy/:itemId (protected)
// IMPORTANT: userId vient du token, pas du body
router.post('/buy/:itemId', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Non autorisÃ©.' });
    }

    const item = await Item.findById(req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Item non trouvÃ©.' });

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: 'Utilisateur non trouvÃ©.' });

    // Optionnel mais conseillÃ© : Ã©viter achat doublon
    const alreadyOwned = user.inventory.some(
      (id) => id.toString() === item._id.toString()
    );
    if (alreadyOwned) {
      return res
        .status(409)
        .json({ message: 'Item dÃ©jÃ  dans ton inventaire.' });
    }

    if (user.balance < item.price) {
      return res.status(400).json({ message: 'Fonds insuffisants.' });
    }

    user.balance -= item.price;
    user.inventory.push(item._id);
    await user.save();

    return res.status(200).json({
      message: `Achat rÃ©ussi ! ${item.name} a Ã©tÃ© ajoutÃ© Ã  ton inventaire.`,
      newBalance: user.balance,
      inventory: user.inventory,
    });
  } catch (err) {
    console.error('POST /shop/buy ERROR:', err);
    return res.status(500).json({ message: "Erreur serveur lors de l'achat." });
  }
});

// POST /shop/items (protected)
// (IdÃ©alement rÃ©servÃ© admin, mais au minimum protÃ©gÃ© par JWT)
router.post('/items', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    return res.status(201).json(newItem);
  } catch (err) {
    console.error('POST /shop/items ERROR:', err);
    return res
      .status(400)
      .json({ message: "Erreur lors de la crÃ©ation de l'item." });
  }
});

module.exports = router;

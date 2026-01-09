const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const User = require('../models/User');
// Route pour obtenir tous les articles
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    console.error('GET /shop/items ERROR:', err); // <- AJOUT
    res.status(500).json({
      message: 'Erreur serveur lors de la récupération des items.',
    });
  }
});

// POST /buy/:itemId
router.post('/buy/:itemId', async (req, res) => {
  try {
    const { userId } = req.body; // ID de l'utilisateur effectuant l'achat
    const item = await Item.findById(req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Item non trouvé.' });

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });

    if (user.balance < item.price) {
      return res.status(400).json({ message: 'Fonds insuffisants.' });
    }

    // Met à jour les données
    user.balance -= item.price;
    user.inventory.push(item._id);
    await user.save();

    res.status(200).json({
      message: `Achat réussi ! ${item.name} a été ajouté à ton inventaire.`,
      newBalance: user.balance,
      inventory: user.inventory,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur lors de l'achat. " });
  }
});

// POST /shop/items
router.post('/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la création de l'item." });
  }
});
module.exports = router;

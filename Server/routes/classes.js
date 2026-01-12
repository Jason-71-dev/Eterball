const express = require('express');
const router = express.Router();
const Class = require('../models/Classes');
/**
 * GET /classes
 * Récupérer toutes les classes (triées par ordre d'affichage)
 */
router.get('/classes', async (req, res) => {
  try {
    const classes = await Class.find().sort({ order: 1 });
    res.status(200).json(classes);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Erreur serveur lors de la récupération des classes.' });
  }
});
// GET /classes/carousel
router.get('/classes/carousel', async (req, res) => {
  try {
    const classes = await Class.find()
      .sort({ order: 1 })
      .select('name slug image description order');

    res.status(200).json(classes);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Erreur serveur lors de la récupération des classes (carousel).',
    });
  }
});
/**
 * GET /classes/:slug
 * Récupérer une classe par son slug
 */
router.get('/classes/:slug', async (req, res) => {
  try {
    const classData = await Class.findOne({ slug: req.params.slug });

    if (!classData) {
      return res.status(404).json({ message: 'Classe non trouvée.' });
    }

    res.status(200).json(classData);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Erreur serveur lors de la récupération de la classe.',
    });
  }
});

/**
 * POST /classes
 * Créer une nouvelle classe
 */
router.post('/classes', async (req, res) => {
  try {
    const newClass = new Class(req.body);
    await newClass.save();
    res.status(201).json(newClass);
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: 'Erreur lors de la création de la classe.',
      error: err.message,
    });
  }
});

/**
 * PATCH /classes/:id
 * Mettre à jour une classe
 */
router.patch('/classes/:id', async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedClass) {
      return res.status(404).json({ message: 'Classe non trouvée.' });
    }

    res.status(200).json(updatedClass);
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: 'Erreur lors de la mise à jour de la classe.',
      error: err.message,
    });
  }
});

/**
 * DELETE /classes/:id
 * Supprimer une classe
 */
router.delete('/classes/:id', async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);

    if (!deletedClass) {
      return res.status(404).json({ message: 'Classe non trouvée.' });
    }

    res.status(200).json({
      message: 'Classe supprimée avec succès.',
      deletedClassId: deletedClass._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Erreur serveur lors de la suppression de la classe.',
    });
  }
});

module.exports = router;

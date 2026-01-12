// models/Team.js
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    server: { type: String, required: true, index: true }, // ex: "Dragos"

    // Ton rendu montre un logo, donc on prévoit un champ
    logoURL: { type: String, default: '' },

    // Optionnel mais pratique
    tag: { type: String, default: '', trim: true }, // ex: [MGIE]
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    // membres (si tu veux lier les users à une équipe)
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    // pour éviter les doublons de nom par serveur
    slug: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

teamSchema.index({ server: 1, slug: 1 }, { unique: true });

module.exports = mongoose.model('Team', teamSchema);

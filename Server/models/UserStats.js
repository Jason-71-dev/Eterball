// models/UserStats.js
const mongoose = require('mongoose');

const userStatsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },

    server: { type: String, required: true, index: true }, // ex: "Dragos"
    class: { type: String, required: true }, // ex: "Milieu"

    // Ladder Général
    levelGen: { type: Number, default: 1, min: 1, index: true },
    matches: { type: Number, default: 0, min: 0, index: true },

    // Ladder Succès
    successPoints: { type: Number, default: 0, min: 0, index: true },

    // Optionnel : si tu veux “saisons” plus tard
    season: { type: Number, default: 1, index: true },
  },
  { timestamps: true }
);

// Index de tri (classement)
userStatsSchema.index({
  server: 1,
  season: 1,
  levelGen: -1,
  matches: -1,
  _id: 1,
});
userStatsSchema.index({ server: 1, season: 1, successPoints: -1, _id: 1 });

module.exports = mongoose.model('UserStats', userStatsSchema);

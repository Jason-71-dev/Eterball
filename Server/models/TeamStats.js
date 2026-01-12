// models/TeamStats.js
const mongoose = require('mongoose');

const teamStatsSchema = new mongoose.Schema(
  {
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
      unique: true,
      index: true,
    },

    server: { type: String, required: true, index: true }, // recopié pour filtrer sans populate

    // Ladder Soccherium
    rating: { type: Number, default: 0, min: 0, index: true }, // "Côte"
    wins: { type: Number, default: 0, min: 0, index: true }, // "Victoires"
    streak: { type: Number, default: 0, min: 0, index: true }, // "Série"
    level: { type: Number, default: 1, min: 1, index: true }, // "Niveau"

    season: { type: Number, default: 1, index: true },
  },
  { timestamps: true }
);

// Index de tri (classement)
teamStatsSchema.index({
  server: 1,
  season: 1,
  rating: -1,
  wins: -1,
  streak: -1,
  _id: 1,
});

module.exports = mongoose.model('TeamStats', teamStatsSchema);

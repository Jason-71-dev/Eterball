// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    // identifiant de connexion (unique)
    identifier: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
    },

    // infos profil
    firstName: { type: String, required: true, trim: true, maxlength: 50 },
    lastName: { type: String, required: true, trim: true, maxlength: 50 },

    // pseudo affiché (unique)
    pseudo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },

    // email (unique)
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    //  mdp hashé
    password: { type: String, required: true },

    birthDate: { type: Date, required: true },

    // solde du joueur
    balance: { type: Number, default: 1000, min: 0 },

    // inventaire du joueur
    inventory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    avatarURL: {
      type: String,
      default: '', // important
    },
  },

  { timestamps: true }
);
const User = mongoose.model('User', userSchema);
module.exports = User;

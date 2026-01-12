const mongoose = require('mongoose');

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    role: {
      type: String,
      enum: ['offense', 'defense', 'support', 'hybrid'],
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    stats: {
      hp: { type: Number, required: true, min: 0 },
      attack: { type: Number, required: true, min: 0 },
      defense: { type: Number, required: true, min: 0 },
      speed: { type: Number, required: true, min: 0 },
      technique: { type: Number, required: true, min: 0 },
      stamina: { type: Number, required: true, min: 0 },
    },

    description: {
      type: String,
      maxlength: 500,
      default: '',
    },

    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard', 'expert'],
      required: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Class = mongoose.model('Class', classSchema);

module.exports = Class;

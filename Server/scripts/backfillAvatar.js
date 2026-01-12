// scripts/backfillAvatar.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  const res = await User.updateMany(
    { avatarURL: { $exists: false } },
    { $set: { avatarURL: '' } }
  );

  console.log(`✅ Users updated: ${res.modifiedCount}`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error('❌ Backfill failed:', err);
  process.exit(1);
});

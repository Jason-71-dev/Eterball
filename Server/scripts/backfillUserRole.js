// scripts/backfillUserRole.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  const res = await User.updateMany(
    { role: { $exists: false } },
    { $set: { role: 'user' } }
  );

  console.log(`User roles backfilled: ${res.modifiedCount}`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error('Backfill role failed:', err);
  process.exit(1);
});
// scripts/promoteAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

async function run() {
  const identifier = process.argv[2];
  if (!identifier) {
    console.error('Usage: node scripts/promoteAdmin.js <identifier>');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);

  const user = await User.findOneAndUpdate(
    { identifier: identifier.toLowerCase() },
    { $set: { role: 'admin' } },
    { new: true }
  );

  if (!user) {
    console.error('User not found');
    await mongoose.disconnect();
    process.exit(1);
  }

  console.log(`Admin role set for ${user.identifier}`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error('Promote admin failed:', err);
  process.exit(1);
});

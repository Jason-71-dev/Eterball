require('dotenv').config();
const mongoose = require('mongoose');

const User = require('../models/User');
const UserStats = require('../models/UserStats');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  const users = await User.find({}, '_id').lean();

  let created = 0;

  for (const user of users) {
    const exists = await UserStats.exists({ user: user._id });
    if (exists) continue;

    await UserStats.create({
      user: user._id,
      server: 'Dragos', // 🔴 adapte si tu as plusieurs serveurs
      class: 'Milieu', // 🔴 valeur par défaut temporaire
      levelGen: 1,
      matches: 0,
      successPoints: 0,
      season: 1,
    });

    created++;
  }

  console.log(`✅ UserStats created: ${created}`);
  await mongoose.disconnect();
}

run().catch(console.error);

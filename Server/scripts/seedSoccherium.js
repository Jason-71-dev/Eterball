require('dotenv').config();
const mongoose = require('mongoose');

const Team = require('../models/Team');
const TeamStats = require('../models/TeamStats');

async function upsertTeamWithStats(t) {
  const team = await Team.findOneAndUpdate(
    { server: t.server, slug: t.slug },
    {
      $set: {
        name: t.name,
        logoURL: t.logoURL,
        tag: t.tag || '',
        server: t.server,
        slug: t.slug,
      },
    },
    { upsert: true, new: true }
  );

  await TeamStats.findOneAndUpdate(
    { team: team._id },
    {
      $set: {
        server: t.server,
        season: t.season,
        rating: t.rating,
        wins: t.wins,
        streak: t.streak,
        level: t.level,
      },
      $setOnInsert: { team: team._id },
    },
    { upsert: true, new: true }
  );
}

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  const season = 1;
  const server = 'Dragos';

  const teams = [
    {
      name: 'MG|E',
      slug: 'mge',
      logoURL: '/mge.png',
      rating: 5460,
      wins: 100,
      streak: 16,
      level: 58,
      tag: '',
    },
    {
      name: 'NANKATSU',
      slug: 'nankatsu',
      logoURL: '/nankatsu.png',
      rating: 5200,
      wins: 98,
      streak: 12,
      level: 55,
      tag: '',
    },
    {
      name: 'MAGMA',
      slug: 'magma',
      logoURL: '/magma.png',
      rating: 5060,
      wins: 96,
      streak: 11,
      level: 51,
      tag: '',
    },
  ].map((t) => ({ ...t, server, season }));

  for (const t of teams) {
    await upsertTeamWithStats(t);
  }

  console.log('✅ Soccherium seeded');
  await mongoose.disconnect();
}

run().catch(console.error);

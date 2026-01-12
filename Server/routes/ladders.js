// routes/ladders.js
const express = require('express');
const router = express.Router();

const UserStats = require('../models/UserStats');
const TeamStats = require('../models/TeamStats');

function getPaging(req, defaultLimit = 50) {
  const page = Math.max(1, Number(req.query.page ?? 1));
  const limit = Math.min(
    100,
    Math.max(1, Number(req.query.limit ?? defaultLimit))
  );
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

// GET /api/ladders/general?server=Dragos&season=1&page=1&limit=50
router.get('/general', async (req, res) => {
  try {
    const server = String(req.query.server ?? '').trim();
    const season = Number(req.query.season ?? 1);
    if (!server) return res.status(400).json({ error: 'server is required' });

    const { page, limit, skip } = getPaging(req);

    const rows = await UserStats.find({ server, season })
      .sort({ levelGen: -1, matches: -1, _id: 1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'pseudo avatarURL')

      .lean();

    const data = rows.map((r, i) => ({
      rank: skip + i + 1,
      avatarURL: r.user?.avatarURL ?? '',
      pseudo: r.user?.pseudo ?? 'Unknown',
      class: r.class,
      server: r.server,
      level: r.levelGen,
      matches: r.matches,
    }));

    res.json({ page, limit, data });
  } catch (err) {
    console.error('GET /ladders/general', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/ladders/success?server=Dragos&season=1&page=1&limit=50
router.get('/success', async (req, res) => {
  try {
    const server = String(req.query.server ?? '').trim();
    const season = Number(req.query.season ?? 1);
    if (!server) return res.status(400).json({ error: 'server is required' });

    const { page, limit, skip } = getPaging(req);

    const rows = await UserStats.find({ server, season })
      .sort({ successPoints: -1, _id: 1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'pseudo avatarURL')
      .lean();

    const data = rows.map((r, i) => ({
      rank: skip + i + 1,
      avatarURL: r.user?.avatarURL ?? '',
      pseudo: r.user?.pseudo ?? 'Unknown',
      class: r.class,
      server: r.server,
      level: r.levelGen,
      successPoints: r.successPoints,
    }));

    res.json({ page, limit, data });
  } catch (err) {
    console.error('GET /ladders/success', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/ladders/soccherium?server=Dragos&season=1&page=1&limit=50
router.get('/soccherium', async (req, res) => {
  try {
    const server = String(req.query.server ?? '').trim();
    const season = Number(req.query.season ?? 1);
    if (!server) return res.status(400).json({ error: 'server is required' });

    const { page, limit, skip } = getPaging(req);

    const rows = await TeamStats.find({ server, season })
      .sort({ rating: -1, wins: -1, streak: -1, _id: 1 })
      .skip(skip)
      .limit(limit)
      .populate('team', 'name logoURL tag server')
      .lean();

    const data = rows.map((r, i) => ({
      rank: skip + i + 1,
      teamName: r.team?.name ?? 'Unknown',
      tag: r.team?.tag ?? '',
      logoURL: r.team?.logoURL ?? '',
      server: r.server,
      level: r.level,
      rating: r.rating,
      wins: r.wins,
      streak: r.streak,
    }));

    res.json({ page, limit, data });
  } catch (err) {
    console.error('GET /ladders/soccherium', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

// routes/stats.js
const express = require('express');
const router = express.Router();

const UserStats = require('../models/UserStats');
const TeamStats = require('../models/TeamStats');
const Team = require('../models/Team');

// helpers
function toInt(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.trunc(n) : fallback;
}
function requiredString(value) {
  return typeof value === 'string' && value.trim().length > 0
    ? value.trim()
    : '';
}

/**
 * USER STATS
 * ----------
 * Convention: envoies server + class au moins lors de la création/upsert.
 */

// POST /api/stats/user/init
// body: { userId, server, class, season? }
router.post('/user/init', async (req, res) => {
  try {
    const userId = req.body.userId;
    const server = requiredString(req.body.server);
    const playerClass = requiredString(req.body.class);
    const season = toInt(req.body.season, 1);

    if (!userId) return res.status(400).json({ error: 'userId is required' });
    if (!server) return res.status(400).json({ error: 'server is required' });
    if (!playerClass)
      return res.status(400).json({ error: 'class is required' });

    const doc = await UserStats.findOneAndUpdate(
      { user: userId },
      {
        $setOnInsert: {
          user: userId,
          server,
          class: playerClass,
          season,
          levelGen: 1,
          matches: 0,
          successPoints: 0,
        },
        // si un user change de serveur/classe (optionnel)
        $set: { server, class: playerClass, season },
      },
      { upsert: true, new: true }
    ).lean();

    res.json({ ok: true, stats: doc });
  } catch (err) {
    console.error('POST /stats/user/init', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /api/stats/user/match-played
// body: { userId, inc?: number, server?, class?, season? }
router.patch('/user/match-played', async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) return res.status(400).json({ error: 'userId is required' });

    const inc = Math.max(1, toInt(req.body.inc, 1));
    const server = requiredString(req.body.server);
    const playerClass = requiredString(req.body.class);
    const season = toInt(req.body.season, 1);

    const update = {
      $inc: { matches: inc },
      $setOnInsert: {
        user: userId,
        server: server || 'Unknown',
        class: playerClass || 'Unknown',
        season,
        levelGen: 1,
        matches: 0,
        successPoints: 0,
      },
    };

    // si tu fournis server/class on les synchronise
    const set = {};
    if (server) set.server = server;
    if (playerClass) set.class = playerClass;
    if (season) set.season = season;
    if (Object.keys(set).length) update.$set = set;

    const doc = await UserStats.findOneAndUpdate({ user: userId }, update, {
      upsert: true,
      new: true,
    }).lean();

    res.json({ ok: true, stats: doc });
  } catch (err) {
    console.error('PATCH /stats/user/match-played', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /api/stats/user/level
// body: { userId, value?: number, inc?: number, server?, class?, season? }
router.patch('/user/level', async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) return res.status(400).json({ error: 'userId is required' });
    const value =
      req.body.value !== undefined ? toInt(req.body.value, 1) : null;
    const inc = req.body.inc !== undefined ? toInt(req.body.inc, 0) : null;
    const server = requiredString(req.body.server);
    const playerClass = requiredString(req.body.class);
    const season = toInt(req.body.season, 1);
    const update = {
      $setOnInsert: {
        user: userId,
        server: server || 'Unknown',
        class: playerClass || 'Unknown',
        season,
        levelGen: 1,
        matches: 0,
        successPoints: 0,
      },
    };
    if (value !== null) {
      update.$set = { ...(update.$set || {}), levelGen: Math.max(1, value) };
    } else if (inc !== null && inc !== 0) {
      update.$inc = { ...(update.$inc || {}), levelGen: inc };
    } else {
      return res.status(400).json({ error: 'Provide value or inc' });
    }
    const set = {};
    if (server) set.server = server;
    if (playerClass) set.class = playerClass;
    if (season) set.season = season;
    if (Object.keys(set).length)
      update.$set = { ...(update.$set || {}), ...set };
    const doc = await UserStats.findOneAndUpdate({ user: userId }, update, {
      upsert: true,
      new: true,
    }).lean();
    if (doc.levelGen < 1) {
      const fixed = await UserStats.findOneAndUpdate(
        { user: userId },
        { $set: { levelGen: 1 } },
        { new: true }
      ).lean();
      return res.json({ ok: true, stats: fixed });
    }
    res.json({ ok: true, stats: doc });
  } catch (err) {
    console.error('PATCH /stats/user/level', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /api/stats/user/success
// body: { userId, inc: number, server?, class?, season? }
router.patch('/user/success', async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) return res.status(400).json({ error: 'userId is required' });

    const inc = toInt(req.body.inc, 0);
    if (!inc)
      return res.status(400).json({ error: 'inc is required (non-zero)' });

    const server = requiredString(req.body.server);
    const playerClass = requiredString(req.body.class);
    const season = toInt(req.body.season, 1);

    const update = {
      $inc: { successPoints: inc },
      $setOnInsert: {
        user: userId,
        server: server || 'Unknown',
        class: playerClass || 'Unknown',
        season,
        levelGen: 1,
        matches: 0,
        successPoints: 0,
      },
    };

    const set = {};
    if (server) set.server = server;
    if (playerClass) set.class = playerClass;
    if (season) set.season = season;
    if (Object.keys(set).length) update.$set = set;

    const doc = await UserStats.findOneAndUpdate({ user: userId }, update, {
      upsert: true,
      new: true,
    }).lean();

    // clamp min 0
    if (doc.successPoints < 0) {
      const fixed = await UserStats.findOneAndUpdate(
        { user: userId },
        { $set: { successPoints: 0 } },
        { new: true }
      ).lean();
      return res.json({ ok: true, stats: fixed });
    }

    res.json({ ok: true, stats: doc });
  } catch (err) {
    console.error('PATCH /stats/user/success', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * TEAM STATS (Soccherium)
 * ----------------------
 */

// POST /api/stats/team/init
// body: { teamId, server, season? }
router.post('/team/init', async (req, res) => {
  try {
    const teamId = req.body.teamId;
    const server = requiredString(req.body.server);
    const season = toInt(req.body.season, 1);

    if (!teamId) return res.status(400).json({ error: 'teamId is required' });
    if (!server) return res.status(400).json({ error: 'server is required' });

    // optionnel: vérifier que l'équipe existe
    const teamExists = await Team.exists({ _id: teamId });
    if (!teamExists) return res.status(404).json({ error: 'Team not found' });

    const doc = await TeamStats.findOneAndUpdate(
      { team: teamId },
      {
        $setOnInsert: {
          team: teamId,
          server,
          season,
          rating: 0,
          wins: 0,
          streak: 0,
          level: 1,
        },
        $set: { server, season },
      },
      { upsert: true, new: true }
    ).lean();

    res.json({ ok: true, stats: doc });
  } catch (err) {
    console.error('POST /stats/team/init', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /api/stats/team/soccherium
// body: { teamId, server, season?, ratingInc?, ratingSet?, winsInc?, streakSet?, streakInc?, levelSet?, levelInc? }
router.patch('/team/soccherium', async (req, res) => {
  try {
    const teamId = req.body.teamId;
    const server = requiredString(req.body.server);
    const season = toInt(req.body.season, 1);

    if (!teamId) return res.status(400).json({ error: 'teamId is required' });
    if (!server) return res.status(400).json({ error: 'server is required' });

    const update = {
      $setOnInsert: {
        team: teamId,
        server,
        season,
        rating: 0,
        wins: 0,
        streak: 0,
        level: 1,
      },
    };

    // rating
    if (req.body.ratingSet !== undefined) {
      update.$set = {
        ...(update.$set || {}),
        rating: Math.max(0, toInt(req.body.ratingSet, 0)),
      };
    } else if (req.body.ratingInc !== undefined) {
      update.$inc = {
        ...(update.$inc || {}),
        rating: toInt(req.body.ratingInc, 0),
      };
    }

    // wins
    if (req.body.winsInc !== undefined) {
      update.$inc = {
        ...(update.$inc || {}),
        wins: toInt(req.body.winsInc, 0),
      };
    }

    // streak
    if (req.body.streakSet !== undefined) {
      update.$set = {
        ...(update.$set || {}),
        streak: Math.max(0, toInt(req.body.streakSet, 0)),
      };
    } else if (req.body.streakInc !== undefined) {
      update.$inc = {
        ...(update.$inc || {}),
        streak: toInt(req.body.streakInc, 0),
      };
    }

    // level
    if (req.body.levelSet !== undefined) {
      update.$set = {
        ...(update.$set || {}),
        level: Math.max(1, toInt(req.body.levelSet, 1)),
      };
    } else if (req.body.levelInc !== undefined) {
      update.$inc = {
        ...(update.$inc || {}),
        level: toInt(req.body.levelInc, 0),
      };
    }

    // toujours garder server/season à jour
    update.$set = { ...(update.$set || {}), server, season };

    // si aucune modif fournie
    const hasInc = !!update.$inc && Object.keys(update.$inc).length > 0;
    const hasSet = !!update.$set && Object.keys(update.$set).length > 0;
    if (!hasInc && !hasSet)
      return res.status(400).json({ error: 'No updates provided' });

    const doc = await TeamStats.findOneAndUpdate({ team: teamId }, update, {
      upsert: true,
      new: true,
    }).lean();

    // clamp (rating >=0, wins>=0, streak>=0, level>=1)
    const clamp = {};
    if (doc.rating < 0) clamp.rating = 0;
    if (doc.wins < 0) clamp.wins = 0;
    if (doc.streak < 0) clamp.streak = 0;
    if (doc.level < 1) clamp.level = 1;

    if (Object.keys(clamp).length) {
      const fixed = await TeamStats.findOneAndUpdate(
        { team: teamId },
        { $set: clamp },
        { new: true }
      ).lean();
      return res.json({ ok: true, stats: fixed });
    }

    res.json({ ok: true, stats: doc });
  } catch (err) {
    console.error('PATCH /stats/team/soccherium', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

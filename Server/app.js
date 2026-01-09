const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

dotenv.config();

const authRoutes = require('./routes/auth'); // nouveau fichier unique
const shopRoutes = require('./routes/shop');
const classesRoutes = require('./routes/classes');

const PORT = process.env.PORT || 5000;
const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL, // https://eterball.vercel.app
  'http://localhost:3000',
  'http://localhost:5173',
].filter(Boolean);

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const accountRoutes = require('./routes/account');

app.use('/account', accountRoutes);
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());
app.use(morgan('combined'));

// Health
app.get('/health', (req, res) => res.status(200).send('ok'));

// Routes
app.use('/auth', authRoutes); // POST /auth/signup | POST /auth/login
app.use('/shop', shopRoutes);
app.use('/api', classesRoutes);

// Mongo
console.log('Tentative de connexion MongoDB...');
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connecté à MongoDB'))
  .catch((err) => console.error('Erreur MongoDB:', err));

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

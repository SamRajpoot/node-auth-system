// const express = require('express');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// const authRoutes = require('./routes/auth.routes');
// const cors = require('cors');

// dotenv.config();
// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);

// module.exports = app;

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.routes');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

app.use('/api/auth', authRoutes);

module.exports = app;


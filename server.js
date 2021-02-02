const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const connectDB = require('./config/db');

// Enviroment variables
require('dotenv').config({ path: 'config.env' });

// Import Routes
const usersRoutes = require('./routes/api/users');
const authRoutes = require('./routes/api/auth');
const recipesRoutes = require('./routes/api/recipes');

const app = express();

//Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = process.env.DB_URI;

//App port
const PORT = process.env.PORT || 5000;

// Connect to mongo db
connectDB(db);

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use API Routes
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipesRoutes);

// Start the engines
app.listen(PORT, () => {
  console.log(
    `Recipe server is running on port ${PORT} | Start the fucking engine!`
  );
});

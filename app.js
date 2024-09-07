require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret', // Change this to a secure secret in production
  resave: false,
  saveUninitialized: false,
}));

// View engine
app.set('view engine', 'ejs');

// Static files
app.use(express.static('public'));

// Routes
app.use('/', authRoutes);
app.use('/tasks', taskRoutes);

// Root Route: Render login/signup page
app.get('/', (req, res) => {
    res.render('index'); // Render a page with login and signup buttons
  });

// Listen on port 3000
app.listen(3000, () => console.log('Server running on port 3000'));

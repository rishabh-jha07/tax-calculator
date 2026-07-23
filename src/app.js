/**
 * src/app.js
 * Configures and exports the Express application.
 * Separating the app from the server start allows for easier testing.
 */
const express = require('express');
const path = require('path');
const taxRoutes = require('./routes/tax.routes');

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Mount API routes
app.use('/api', taxRoutes);

// Route for the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

module.exports = app;

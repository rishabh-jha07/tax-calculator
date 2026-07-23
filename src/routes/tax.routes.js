/**
 * src/routes/tax.routes.js
 * Defines the API routes related to tax operations.
 */
const express = require('express');
const router = express.Router();
const taxController = require('../controllers/tax.controller');

// POST route to calculate tax
router.post('/calculate-tax', taxController.calculateTax);

module.exports = router;

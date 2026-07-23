/**
 * src/controllers/tax.controller.js
 * Handles incoming requests for tax calculation and communicates with the model.
 */
const TaxModel = require('../models/tax.model');

exports.calculateTax = (req, res) => {
    try {
        const { income, taxRate } = req.body;
        const totalTax = TaxModel.calculate(income, taxRate);

        res.status(200).json({
            success: true,
            income: Number(income),
            taxRate: Number(taxRate),
            totalTax: totalTax
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

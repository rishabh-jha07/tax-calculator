/**
 * src/models/tax.model.js
 * Contains the core business logic and validations for tax calculations.
 */
class TaxModel {
    /**
     * Calculates the total tax based on income and tax rate.
     * @param {number|string} income - The user's income.
     * @param {number|string} taxRate - The tax rate percentage (e.g., 20 for 20%).
     * @returns {number} The calculated total tax.
     */
    static calculate(income, taxRate) {
        if (income === undefined || income === null || income === '') {
            throw new Error('Income cannot be empty');
        }
        if (taxRate === undefined || taxRate === null || taxRate === '') {
            throw new Error('Tax rate cannot be empty');
        }

        const numIncome = Number(income);
        const numTaxRate = Number(taxRate);

        if (isNaN(numIncome) || isNaN(numTaxRate)) {
            throw new Error('Inputs must be valid numbers');
        }
        if (numIncome < 0) {
            throw new Error('Income cannot be negative');
        }
        if (numTaxRate < 0 || numTaxRate > 100) {
            throw new Error('Tax rate must be between 0 and 100');
        }

        const taxAmount = numIncome * (numTaxRate / 100);
        return Math.round(taxAmount * 100) / 100;
    }
}

module.exports = TaxModel;

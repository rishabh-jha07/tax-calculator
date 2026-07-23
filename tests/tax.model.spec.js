/**
 * tests/tax.model.spec.js
 * Unit tests for the TaxModel class.
 */
const TaxModel = require('../src/models/tax.model');

describe('TaxModel', () => {
    describe('Valid Calculations', () => {
        it('should calculate valid tax correctly', () => {
            expect(TaxModel.calculate(50000, 20)).toBe(10000);
        });

        it('should handle zero income correctly', () => {
            expect(TaxModel.calculate(0, 20)).toBe(0);
        });

        it('should handle decimal values properly and round to 2 decimal places', () => {
            expect(TaxModel.calculate(50000.55, 15.5)).toBe(7750.09);
        });

        it('should handle large values correctly', () => {
            expect(TaxModel.calculate(1000000000, 35)).toBe(350000000);
        });
    });

    describe('Invalid Calculations', () => {
        it('should throw error for negative income', () => {
            expect(() => TaxModel.calculate(-5000, 20)).toThrowError('Income cannot be negative');
        });

        it('should throw error for invalid tax percentage (greater than 100)', () => {
            expect(() => TaxModel.calculate(50000, 105)).toThrowError('Tax rate must be between 0 and 100');
        });

        it('should throw error for invalid tax percentage (negative)', () => {
            expect(() => TaxModel.calculate(50000, -5)).toThrowError('Tax rate must be between 0 and 100');
        });

        it('should throw error for empty input (undefined)', () => {
            expect(() => TaxModel.calculate(undefined, 20)).toThrowError('Income cannot be empty');
            expect(() => TaxModel.calculate(50000, undefined)).toThrowError('Tax rate cannot be empty');
        });

        it('should throw error for empty input (null)', () => {
            expect(() => TaxModel.calculate(null, 20)).toThrowError('Income cannot be empty');
        });

        it('should throw error for empty input (empty string)', () => {
            expect(() => TaxModel.calculate('', 20)).toThrowError('Income cannot be empty');
        });

        it('should throw error for non-numeric input', () => {
            expect(() => TaxModel.calculate('abc', 20)).toThrowError('Inputs must be valid numbers');
        });
    });
});

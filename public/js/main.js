/**
 * public/js/main.js
 * Handles UI interactions, client-side validation, and API communication.
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const elements = {
        form: document.getElementById('tax-form'),
        incomeInput: document.getElementById('income'),
        taxRateInput: document.getElementById('taxRate'),
        incomeError: document.getElementById('income-error'),
        taxRateError: document.getElementById('taxrate-error'),
        resultContainer: document.getElementById('result-container'),
        taxAmountDisplay: document.getElementById('tax-amount'),
        taxSummaryDisplay: document.getElementById('tax-summary'),
        serverErrorDisplay: document.getElementById('server-error'),
        successMessage: document.getElementById('success-message'),
        submitBtn: document.querySelector('.calculate-btn'),
        resetBtn: document.getElementById('reset-btn')
    };

    /**
     * Formats a numeric amount as USD currency.
     * @param {number} amount - The amount to format.
     * @returns {string} Formatted currency string.
     */
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    /**
     * Clears all validation errors and hides result/message containers.
     */
    const resetUI = () => {
        elements.incomeInput.classList.remove('invalid');
        elements.taxRateInput.classList.remove('invalid');
        elements.incomeError.textContent = '';
        elements.taxRateError.textContent = '';
        elements.serverErrorDisplay.classList.add('hidden');
        elements.serverErrorDisplay.textContent = '';
        elements.successMessage.classList.add('hidden');
        elements.resultContainer.classList.add('hidden');
    };

    /**
     * Validates form inputs on the client side before making an API call.
     * @returns {boolean} True if inputs are valid, false otherwise.
     */
    const validateInputs = () => {
        let isValid = true;
        resetUI(); // Clear previous errors

        const incomeVal = elements.incomeInput.value.trim();
        const taxRateVal = elements.taxRateInput.value.trim();

        if (!incomeVal || isNaN(incomeVal) || Number(incomeVal) < 0) {
            elements.incomeInput.classList.add('invalid');
            elements.incomeError.textContent = 'Please enter a valid positive income.';
            isValid = false;
        }

        if (!taxRateVal || isNaN(taxRateVal) || Number(taxRateVal) < 0 || Number(taxRateVal) > 100) {
            elements.taxRateInput.classList.add('invalid');
            elements.taxRateError.textContent = 'Please enter a valid rate between 0 and 100.';
            isValid = false;
        }

        return isValid;
    };

    /**
     * Displays the successful calculation results.
     * @param {Object} data - The response data from the API.
     */
    const displayResults = (data) => {
        elements.taxAmountDisplay.textContent = formatCurrency(data.totalTax);
        elements.taxSummaryDisplay.innerHTML = `Based on an income of <strong>${formatCurrency(data.income)}</strong> at a rate of <strong>${data.taxRate}%</strong>.`;
        
        elements.resultContainer.classList.remove('hidden');
        elements.successMessage.classList.remove('hidden');
        
        // Scroll smoothly on smaller screens
        if (window.innerHeight < 600) {
            elements.resultContainer.scrollIntoView({ behavior: 'smooth' });
        }
    };

    /**
     * Handles the form submission event.
     * @param {Event} e - The submit event.
     */
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!validateInputs()) return;

        // Set loading state
        elements.submitBtn.disabled = true;
        elements.submitBtn.textContent = 'Calculating...';

        try {
            const response = await fetch('/api/calculate-tax', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    income: parseFloat(elements.incomeInput.value),
                    taxRate: parseFloat(elements.taxRateInput.value)
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to calculate tax.');
            }

            displayResults(data);
        } catch (error) {
            console.error('API Error:', error);
            elements.serverErrorDisplay.textContent = error.message;
            elements.serverErrorDisplay.classList.remove('hidden');
        } finally {
            // Restore button state
            elements.submitBtn.disabled = false;
            elements.submitBtn.textContent = 'Calculate';
        }
    };

    // --- Event Listeners ---
    elements.form.addEventListener('submit', handleFormSubmit);

    elements.resetBtn.addEventListener('click', () => {
        elements.form.reset();
        resetUI();
    });

    // Clear validation styling eagerly when user types
    elements.incomeInput.addEventListener('input', () => {
        elements.incomeInput.classList.remove('invalid');
        elements.incomeError.textContent = '';
        elements.successMessage.classList.add('hidden');
    });

    elements.taxRateInput.addEventListener('input', () => {
        elements.taxRateInput.classList.remove('invalid');
        elements.taxRateError.textContent = '';
        elements.successMessage.classList.add('hidden');
    });
});

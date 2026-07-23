/**
 * server.js
 * Entry point for the Tax Calculator application.
 * Only responsible for starting the server on a specific port.
 */
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

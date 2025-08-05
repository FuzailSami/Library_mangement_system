const express = require('express');
const connectDB = require('./db/index');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Import routes
const routes = require('./routes/index');
app.use('/api', routes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
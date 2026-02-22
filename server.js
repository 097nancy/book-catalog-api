// server.js
require('dotenv').config(); // Loads secret variables from the .env file
const express = require('express');
const connectDB = require('./config/db'); // Imports the database connection

// Initialize the Express application
const app = express();

// Connect to MongoDB
connectDB();

// Middleware: Allows our API to understand JSON data sent in requests
app.use(express.json());


// -------- ROUTES ARE HERE --------
// User routes
app.use('/api/users', require('./routes/userRoutes'));

// Book routes
app.use('/api/books', require('./routes/bookroutes'));
// ---------------------------------


// A simple test route just to say hello
app.get('/', (req, res) => {
    res.send('Book Catalog API is running!');
});

// Define the port from our .env file, or use 5000 as a backup
const PORT = process.env.PORT || 5000;

// Start the server and listen for requests
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
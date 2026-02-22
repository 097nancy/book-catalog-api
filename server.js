
require('dotenv').config(); // Loads secret variables from the .env file
const express = require('express');
const connectDB = require('./config/db'); // Imports the database connection


const app = express();


connectDB();

// Middleware: Allows our API to understand JSON data sent in requests
app.use(express.json());



// User routes
app.use('/api/users', require('./routes/userRoutes'));

// Book routes
app.use('/api/books', require('./routes/bookroutes'));
// ---------------------------------



app.get('/', (req, res) => {
    res.send('Book Catalog API is running!');
});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});

// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Connect to MongoDB using the link in our .env file
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connection successful!');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Stop the app if the connection fails
    }
};

module.exports = connectDB;

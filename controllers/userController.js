// controllers/userController.js
const User = require('../models/User'); // Import the User model we created
const bcrypt = require('bcrypt'); // Tool to hide passwords securely
const jwt = require('jsonwebtoken'); // Tool to create login tokens

// 1. Register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if a user with this email already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Scramble (hash) the password so it's safe in the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save the new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // Send a 201 Created response 
        res.status(201).json({
            message: "User registered successfully",
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// 2. Login a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by their email
        const user = await User.findOne({ email });

        // Check if the user exists AND if the password matches the hashed one
        if (user && (await bcrypt.compare(password, user.password))) {
            // Generate a secure JWT token 
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '30d' // Token expires in 30 days
            });

            // Send a 200 OK response with the token 
            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { registerUser, loginUser };
// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// Map the endpoints to the controller functions [cite: 10, 11]
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
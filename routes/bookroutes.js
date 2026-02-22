// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const { getBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware'); // Our VIP pass checker

// Public routes (No token needed) [cite: 18]
router.get('/', getBooks);
router.get('/:id', getBookById);

// Protected routes (Token required!) [cite: 18]
router.post('/', authMiddleware, createBook);
router.put('/:id', authMiddleware, updateBook);
router.delete('/:id', authMiddleware, deleteBook);

module.exports = router;
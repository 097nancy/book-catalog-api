// controllers/bookController.js
const Book = require('../models/book');

// 1. Get all books (Public)
const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// 2. Get a single book by ID (Public)
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// 3. Create a new book (Protected)
const createBook = async (req, res) => {
    try {
        // This line catches the key-value pairs you send from Postman!
        const { title, author, genre, price, inStock } = req.body; 
        
        const newBook = await Book.create({ title, author, genre, price, inStock });
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: "Invalid data", error: error.message });
    }
};

// 4. Update a book (Protected)
const updateBook = async (req, res) => {
    try {
        // req.params.id gets the ID from the URL, req.body gets your new key-values
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) return res.status(404).json({ message: "Book not found" });
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: "Invalid data" });
    }
};

// 5. Delete a book (Protected)
const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: "Book not found" });
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};


module.exports = { getBooks, getBookById, createBook, updateBook, deleteBook };

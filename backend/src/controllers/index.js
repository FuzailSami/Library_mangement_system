const express = require('express');
const router = express.Router();

// Example controller functions
const getBooks = (req, res) => {
    // Logic to get books
    res.send('Get all books');
};

const addBook = (req, res) => {
    // Logic to add a new book
    res.send('Add a new book');
};

// Define routes
router.get('/books', getBooks);
router.post('/books', addBook);

// Export the router
module.exports = router;
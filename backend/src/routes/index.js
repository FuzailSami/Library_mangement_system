const express = require('express');
const router = express.Router();

// Import controller functions
const { getBooks, addBook, updateBook, deleteBook } = require('../controllers/index');

// Define API routes
router.get('/books', getBooks);
router.post('/books', addBook);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

// Export the router
module.exports = router;
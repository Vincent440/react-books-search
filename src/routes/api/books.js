const router = require('express').Router()
const booksController = require('../../controllers/booksController')

// '/api/books' routes
router.route('/')
// get route to: return all saved books as JSON
  .get(booksController.findAll)
// post route to: save a new book to the database
  .post(booksController.create)

// '/api/books/:id' route
router.route('/:id')
// delete a book from the database
  .delete(booksController.remove)

module.exports = router

var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// GET method route
router.get('/', function (req, res) {
  res.send('GET request to the homepage')
})

// POST method route
router.post('/', function (req, res) {
  res.send('POST request to the homepage')
})

// ALL method allows injecting middleware
router.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})

// route parameters
router.get('/users/:userId/books/:bookId', function (req, res) {
  res.send(req.params)
})

// error test
router.get('/error', function (req, res, next) {
  throw "Holy shit!"
})

// chained routes
router.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })
  

module.exports = router
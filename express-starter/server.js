// Dependencies
var express = require('express')
var bodyParser = require('body-parser')
var dotenv = require('dotenv').config()
var knex = require('./knexfile')

// API Server
var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', require('./routes/index'))
app.use('/api/admin_users', require('./routes/admin_users'))
app.use('/api/users', require('./routes/users'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// global error handler
app.use(function(err, req, res, next){
	console.log(err);
    res.status(err.status || 500)
    res.send({
        message: process.env.NODE_ENV === 'development' ? err.message : '',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
})

app.listen(3000)
console.log('API listening on port 3000')

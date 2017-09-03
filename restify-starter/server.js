// Dependencies
var restify = require('restify')
var dotenv = require('dotenv').config()
var knex = require('./knexfile')

// API Server
const server = restify.createServer({ name: 'restify-starter', version: '1.0.0' });
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

require('./routes')(server, restify)

server.listen(3000, function () {
  console.log('%s listening at %s', server.name, server.url)
})


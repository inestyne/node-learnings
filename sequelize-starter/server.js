// Dependencies
import restify from 'restify'
import consign from 'consign'
import dotenv from 'dotenv'
import sequelize from 'sequelize'

// Read .env file
dotenv.config()

// API Server
var namespace = '/api'
const server = restify.createServer({ name: 'restify-starter', versions: [ '1.0.0' ] });
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

consign({ verbose: false })
  .include('libs/config.js')
  .then('db.js')
  // .then('auth.js')
  // .then('libs/middlewares.js')
  .then('middlewares')
  .then('routes')
  // .then('libs/boot.js')
  .into(restify, server, namespace);

server.listen(3000, function () {
  console.log('%s listening at %s', server.name, server.url)
})

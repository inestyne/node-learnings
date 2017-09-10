// Dependencies
import restify from 'restify'
import restify_outh2 from 'restify-oauth2'
import sequelize from 'sequelize'
import dotenv from 'dotenv'
import consign from 'consign'

// Read .env file
dotenv.config()

// API Server Setup
var namespace = '/api'
const server = restify.createServer({ name: 'restify-starter', versions: [ '1.0.0' ] });
server.use(restify.plugins.authorizationParser());
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

// Resrouce Loader
consign({ verbose: true })
  .include('libs/config.js')
  .then('db.js')
  // .then('auth.js')
  // .then('libs/middlewares.js')
  .then('middlewares')
  .then('routes')
  // .then('libs/boot.js')
  .into(restify, server, namespace);

// Server Launcher
server.listen(3000, function () {
  console.log('%s listening at %s', server.name, server.url)
})



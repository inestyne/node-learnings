// Dependencies
import restify from 'restify'
import restify_outh2 from 'restify-oauth2'
import sequelize from 'sequelize'
import dotenv from 'dotenv'
import consign from 'consign'

// Read .env file
dotenv.config()

// API Server Setup
const server = restify.createServer({ name: 'restify-starter', versions: [ '1.0.0' ] });
server.use(restify.plugins.authorizationParser());
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser({ mapParams: true }))

// Resrouce Loader
consign({ verbose: true })
  .then('libs')
  .then('db.js')
  .then('middlewares')
  .then('routes')
  .into(restify, server, '/api')

// Server Launcher
server.listen(3001, function () {
  console.log('%s listening at %s', server.name, server.url)
})



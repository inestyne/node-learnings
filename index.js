// load .env variables
require('dotenv').config();

// initialize knex with knexfile
var knex = require('knex')(require('./knexfile')[process.env.NODE_ENV]);

knex.select('*').from('users').then(function(bots){
	console.log('Rows:', bots.length);
});
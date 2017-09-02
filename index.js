// load .env variables
var dotenv = require('dotenv').config();

// initialize knex with knexfile
var knexfile = require('./knexfile');
var knex = require('knex')(knexfile[process.env.NODE_ENV]);

knex.select('email').from('users').orderBy('email').stream()
	.on('data',function(row){
		console.log(row.email);
	})
	.on('error', function (error) {
      	console.log('Error:', error);
    })
    .on('end', function () {
      	console.log('Finished.')
    });

knex.destroy();

console.log('bye');
var users = require('../queries/users');

module.exports = function(server, restify){
	server.get('/api/users', users.getAll);
}


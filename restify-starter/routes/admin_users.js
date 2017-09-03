var admin_users = require('../queries/admin_users');

module.exports = function(server, restify){
	server.post('/api/admin_users/validate', admin_users.validate);
}


module.exports = ( app, server ) => {
	const Users = app.db.models.Users;

	server.get('/api/users', function (req, res, next) {
		Users.findAll({
        where: {},
        limit: 100
      })
      .then(result => {
      	res.json(result) 
      	return next()
      })
      .catch(err => {
        return next(err)
      });
	});
}


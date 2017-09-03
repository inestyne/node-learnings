module.exports = ( app, server ) => {
	const AdminUsers = app.db.models.AdminUsers;

	server.post('/api/admin_users/validate', function (req, res, next) {
		AdminUsers.validate(req.query.email, req.query.password)
			.then(result => {
				res.json({
          access_token: {
            token: result.token(),
            refresh_token: result.refresh_token()
          },
          user: {
            id: result.id,
            email: result.email,
            first_name: result.first_name,
            last_name: result.last_name,
            firm: {

            },
            name: result.first_name + ' ' + result.last_name,
            admin_user_type: {

            }
          },
          success: true
        }) 
      	return next()
			})
			.catch(err => {
      	return next(err)
    	});
	});
}


module.exports = ( app, server ) => {
	const AdminUser = app.db.models.AdminUser;
	const Firm = app.db.models.Firm;

	server.post('/api/admin_users/validate', async function (req, res, next) {
		try {
			const result = await AdminUser.validate(req.query.email, req.query.password)
			res.json({
	      access_token: {
	        token: result.token(),
	        refresh_token: result.refresh_token()
	      },
	      user: {
	        id: result.id,
	        first_name: result.first_name,
	        last_name: result.last_name,
	        firm: await Firm.find({where:{id: result.selected_firm_id}}),
	        name: result.first_name + ' ' + result.last_name,
	        admin_user_type: await result.getAdminUserType() 
	      },
	      success: true
	    }) 
	  	return next()

	  } catch(err) {
      return next(err)

	  }
	})
}


import restify_router from 'restify-router'

module.exports = ( app, server, namespace ) => {
	const router = new restify_router.Router();
	
	const AdminUser = app.db.models.AdminUser;

	router.post({ path: '/admin_users/sign_in', version: '1.0.0' }, async function (req, res, next) {
		try {
			const user = await AdminUser.validate(req.params.email, req.params.password)
			const token = await user.create_token(req.params.client_id, req.params.client_secret)

			res.json({
	      access_token: {
	        token: token.token,
	        refresh_token: token.refresh_token
	      },
	      user: {
	        id: user.id,
	        first_name: user.first_name,
	        last_name: user.last_name,
	        firm: await user.getFirm({as: 'selected_firm'}),
	        name: user.first_name + ' ' + user.last_name,
	        admin_user_type: await user.getAdminUserType() 
	      },
	      success: true
	    }) 
	  	return next()

	  } catch(err) {
	  	console.log(err)
	    return next(err)

	  }
	})

	router.applyRoutes(server, namespace)
}

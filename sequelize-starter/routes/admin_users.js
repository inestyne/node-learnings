import restify_router from 'restify-router'

module.exports = ( app, server, namespace ) => {
	const router = new restify_router.Router();
	
	const AdminUser = app.db.models.AdminUser;
	const Firm = app.db.models.Firm;

	router.post({ path: '/admin_users/sign_in', version: '1.0.0' }, async function (req, res, next) {
		try {
			const result = await AdminUser.validate(req.params.email, req.params.password)
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

	router.applyRoutes(server, namespace)
}

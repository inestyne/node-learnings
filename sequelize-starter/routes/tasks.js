import restify_router from 'restify-router'

module.exports = ( app, server, namespace ) => {
  const router = new restify_router.Router();

  const Firm = app.db.models.Firm;
  const Task = app.db.models.Task;
  const User = app.db.models.User;
  const AdminUser = app.db.models.AdminUser;

  const page_size = 10

	router.get('/tasks', async function (req, res, next) {
    try {
      const current_page = parseInt(req.query.page)

      const scope = Task.scope(
        { method: [ 'policy', req.user ] },
        { method: [ req.query.filter || 'all', req.user ] }
      )
      
      const results = await scope.findAndCountAll({
         include: [
          { model: Firm, attributes: [ 'id', 'name' ] }, 
          { model: User, attributes: [ 'id', 'email', 'first_name', 'last_name' ], as: 'user' }, 
          { model: User, attributes: [ 'id', 'email', 'first_name', 'last_name' ], as: 'created_by' }, 
          { model: User, attributes: [ 'id', 'email', 'first_name', 'last_name' ], as: 'updated_by' }, 
          { model: AdminUser, attributes: [ 'id', 'email', 'first_name', 'last_name' ], as: 'assigned_to' }, 
          { model: AdminUser, attributes: [ 'id', 'email', 'first_name', 'last_name' ], as: 'assigned_by' }, 
        ],  
        offset: page_size * ( current_page - 1),
        limit: page_size
      })

      // customn mapped instance methods
      const mapped = await results.rows.map(function(result){
        // result.assigned_to.dataValues['refresh_token'] = result.assigned_to.refresh_token()
        return result
      })

      res.json({
        tasks: mapped,
        total_count: results.count,
        total_pages: Math.floor( results.count / page_size ),
        current_page: current_page
      }) 
      return next()

    } catch (err) {
      console.log(err)
      return next(err)

    }
	})

  router.applyRoutes(server, namespace)
}


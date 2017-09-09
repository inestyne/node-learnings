import restify_router from 'restify-router'

module.exports = ( app, server, namespace ) => {
  const router = new restify_router.Router();

  const Firm = app.db.models.Firm;
  const Task = app.db.models.Task;
  const User = app.db.models.User;
  const AdminUser = app.db.models.AdminUser;

	router.get('/tasks', async function (req, res, next) {
    try {
      const user = await AdminUser.find({where:{id:4}})
      const results = await Task.findAll({
        where: { assigned_by_id: user.id, firm_id: user.selected_firm_id },
        include: [
          { model: Firm, attributes: [ 'id', 'name' ] }, 
          { model: User, attributes: [ 'id', 'email', 'first_name', 'last_name' ], as: 'user' }, 
          { model: User, attributes: [ 'id', 'email', 'first_name', 'last_name' ], as: 'created_by' }, 
          { model: User, attributes: [ 'id', 'email', 'first_name', 'last_name' ], as: 'updated_by' }, 
          { model: AdminUser, attributes: [ 'id', 'email', 'first_name', 'last_name' ], as: 'assigned_to' }, 
          { model: AdminUser, attributes: [ 'id', 'email', 'first_name', 'last_name' ], as: 'assigned_by' }, 
        ],  
        limit: 25
      })

      // customn mapped instance methods
      const mapped = await results.map(function(result){
        result.assigned_to.dataValues['refresh_token'] = result.assigned_to.refresh_token()
        return result
      })

      res.json(mapped) 
      return next()

    } catch (err) {
      console.log(err)
      return next(err)

    }
	})

  router.applyRoutes(server, namespace)
}


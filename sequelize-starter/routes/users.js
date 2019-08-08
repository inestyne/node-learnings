import restify_router from 'restify-router'

module.exports = ( app, server, namespace ) => {
  const router = new restify_router.Router();
	
  const User = app.db.models.User;

	router.get('/users', async function (req, res, next) {
    try {
      const users = await User.findAll({
        where: {},
        limit: 100
      })

      res.json(users) 
      return next()

    } catch (err) {
      return next(err)

    }
	})

  router.applyRoutes(server, namespace)
}


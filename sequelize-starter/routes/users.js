module.exports = ( app, server ) => {
	const User = app.db.models.User;

	server.get('/api/users', async function (req, res, next) {
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
}


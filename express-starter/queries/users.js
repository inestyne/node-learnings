var knex = require('../knexfile')

function getAll(req, res, next) {
	knex.select('id, email, last_name, first_name'.split(', '))
		.whereNot({ encrypted_password: '' })
		.from('users').orderBy('email')
		// .limit(100)
  //   .map(function(row) {
  // 		return { email: row.email };
  //   })
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Retrieved ALL puppies',
          data: data
        })
    })
    .catch(function (err) {
      return next(err)
    })
}

module.exports = {
  getAll: getAll
};
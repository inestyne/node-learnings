var knex = require('../knexfile')
var bcrypt = require('bcrypt-nodejs')

function validate(req, res, next) {
	knex.select('id, email, first_name, last_name, encrypted_password'.split(', '))
		.where({ email: req.query.email })
		.from('admin_users')
    .limit(1)
    .then(function (data) {
      bcrypt.compare(req.query.password, data[0].encrypted_password, function(err, valid) {
        if (valid)
        {
          res.status(200)
            .json({
              status: 'success',
              message: 'User validated',
              data: {
                id: data[0].id,
                email: data[0].email,
                first_name: data[0].first_name,
                last_name: data[0].last_name
              }
            })
        } else {
            res.status(401)
            .json({
              status: 'unauthorized',
              message: 'User invalid',
            })
        }
      });
    })
    .catch(function (err) {
      return next(err)
    })
}

module.exports = {
  validate: validate
};
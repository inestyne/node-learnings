var knex = require('../knexfile')
var bcrypt = require('bcrypt-nodejs')
var jwt = require('jsonwebtoken')

function validate(req, res, next) {
	knex.select('admin_users.id, email, first_name, last_name, encrypted_password, selected_firm_id'.split(', '))
		.from('admin_users')
    .innerJoin('firms', 'firms.id', '=', 'admin_users.selected_firm_id')
    .where({ email: req.query.email })
    .limit(1)
    .then(function (data) {
      bcrypt.compare(req.query.password, data[0].encrypted_password, function(err, valid) {
        if (valid)
        {
          res.send({
            access_token: {
              token: jwt.sign({id: data[0].id}, process.env.JWT_SECRET, { expiresIn: '1h' }),
              refresh_token: 'gibberish'
            },
            user: {
              id: data[0].id,
              email: data[0].email,
              first_name: data[0].first_name,
              last_name: data[0].last_name,
              firm: {

              },
              name: data[0].first_name + ' ' + data[0].last_name,
              admin_user_type: {

              }
            },
            success: true
          })
          return next()

        } else {
          res.send(401)
          return next()

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
var express = require('express')
var router = express.Router()
var admin_users = require('../queries/admin_users');

router.post('/validate', admin_users.validate);

module.exports = router
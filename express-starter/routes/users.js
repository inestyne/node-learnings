var express = require('express')
var router = express.Router()
var users = require('../queries/users');

router.get('/', users.getAll);

module.exports = router
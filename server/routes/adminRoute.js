var express = require('express')
var router = express.Router();
var userController = require('../controllers/userController');

router.get('/', userController.index);

router.get('/admin/login', userController.loginAdmin);

module.exports = router;
var express = require('express')
var router = express.Router();
var controller = require('../controller/admin.controller');

router.get('', controller.index);
router.post('/create', controller.create)

module.exports = router;
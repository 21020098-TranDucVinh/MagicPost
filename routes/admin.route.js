var express = require('express')
var router = express()
var controller = require('../controller/admin.controller');

router.get('', controller.index);
router.post('/create', controller.create )

module.exports = router;
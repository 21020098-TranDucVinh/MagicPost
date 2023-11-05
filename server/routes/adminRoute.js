var express = require('express')
var router = express.Router();
var userController = require('../controllers/userController');
var adminController = require('../controllers/adminController')

router.get('/', userController.index);

router.get('/admin/login', userController.loginAdmin);

// create new admin [POST] username / password / phone
router.post('/admin', adminController.createAdmin);
router.get('/adminPending', adminController.getAdminPending)

router.get('/admin_collection/:id', adminController.getAdminByCollectionId)


// transaction
router.get('/admin_transaction/:id', adminController.getAdminByTransactionId)


module.exports = router;
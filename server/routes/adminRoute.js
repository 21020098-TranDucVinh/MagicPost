var express = require('express')
var router = express.Router();
var adminController = require('../controllers/adminController')


// create new admin [POST] username / password / phone
router.post('/admin', adminController.createAdmin);
router.get('/adminPending', adminController.getAdminPending)

router.get('/admin_collection/:zip_code', adminController.getAdminByCollectionId)


// transaction
router.get('/admin_transaction/:zip_code', adminController.getAdminByTransactionId)


module.exports = router;
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { adminAuth } = require('../middleware/authenticate');

// create new admin [POST] username / password / phone
router.post('/admin', adminAuth, adminController.createAdmin);
router.get('/adminPending', adminAuth, adminController.getAdminPending);

router.get(
  '/admin_collection/:zip_code', adminAuth,
  adminController.getAdminByCollectionId,
);

// transaction
router.get(
  '/admin_transaction/:zip_code', adminAuth,
  adminController.getAdminByTransactionId,
);

module.exports = router;

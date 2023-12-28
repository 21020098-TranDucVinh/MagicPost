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

router.put('/admin/:id', adminAuth, adminController.updateAdmin);
router.delete('/admin/:id', adminAuth, adminController.deleteAdmin);

module.exports = router;


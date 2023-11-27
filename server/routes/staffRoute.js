const express = require('express');
const staffController = require('../controllers/staffController');
const router = express.Router();

router.post('/staff', staffController.createStaff);

router.get(
  '/transaction_staff/:transaction_zip_code',
  staffController.getTransactionStaff,
);

router.put('/staff/:staff_id', staffController.updateStaff);
router.delete('/staff/:staff_id', staffController.deleteStaff);

module.exports = router;

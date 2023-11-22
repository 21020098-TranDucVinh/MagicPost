const express = require('express');
const trackingController = require('../controllers/trackingController');
const router = express.Router();

router.post('/ctt/:s_staff_id', trackingController.customerToTransaction);
router.post('/ttc', trackingController.TransactionToCollection);
router.post('/ctc',trackingController.CollectionToCollection)

module.exports = router;
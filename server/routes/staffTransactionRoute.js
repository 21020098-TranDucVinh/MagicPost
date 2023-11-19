const express = require('express');
const staffTransactionController = require('../controllers/staffTransactionController');
const router = express.Router();

router.post('/test', staffTransactionController.test);
router.post('/parcel_from_collection', staffTransactionController.parcelFromCollection)
module.exports = router;
const express = require('express');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

router.get('/transactions', transactionController.getAllTransactions);
router.get('/transaction/:zipcode', transactionController.getTransactionByZipcode);
router.get('/transactions/:collection_zip_code', transactionController.getTransactionByCollectionId);

router.post('/transactions', transactionController.createTransaction);

module.exports = router;
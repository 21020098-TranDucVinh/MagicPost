const express = require('express');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

router.get('/transactions', transactionController.getAllTransactions);
router.get('/transactions/:zip_code', transactionController.getTransactionByZipcode);

router.post('/transactions', transactionController.createTransaction);

router.put('/transactions/:zip_code', transactionController.updateTransaction);

router.delete('/transactions/:zip_code', transactionController.deleteTransaction);


module.exports = router;
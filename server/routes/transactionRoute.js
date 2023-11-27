const express = require('express');
const transactionController = require('../controllers/transactionController');
const { adminAuth } = require('../middleware/authenticate');

const router = express.Router();

router.get('/transactions', transactionController.getAllTransactions);
router.get(
  '/transactions/:zip_code',
  transactionController.getTransactionByZipcode,
);

router.post('/transactions', adminAuth, transactionController.createTransaction);

router.put('/transactions/:zip_code', transactionController.updateTransaction);

router.delete(
  '/transactions/:zip_code', adminAuth,
  transactionController.deleteTransaction,
);

module.exports = router;

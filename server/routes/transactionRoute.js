const express = require('express');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

router.get('/transactions', transactionController.getAllTransactions);
router.get('/transactions/:zip_code', transactionController.getTransactionByZipcode);

router.post('/transactions', transactionController.createTransaction);

router.put('/transactions/:zip_code', transactionController.updateTransaction);

router.delete('/transactions/:zip_code', transactionController.deleteTransaction);

// transaction_staff
router.post('/transaction_staff', transactionController.storeTransactionStaff);
router.get('/transaction_staff/:transaction_zip_code', transactionController.getTransactionStaff);
router.put('/transaction_staff/:staff_id', transactionController.updateTransactionStaff);
router.delete('/transaction_staff/:staff_id', transactionController.deleteTransactionStaff);
// router.get('/transaction_staff/:id/edit', transactionController.editTransactionStaff);
// router.get('transaction_staff/create', transactionController.createTransactionStaff);



module.exports = router;
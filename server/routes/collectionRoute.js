const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');

router.get('/collections', collectionController.getAllCollections);
router.get('/collections/:zip_code', collectionController.getCollectionByZipcode);
router.get('/collections/:zip_code/transactions', collectionController.getTransactionsByCollectionZipcode);

router.post('/collections', collectionController.createCollection);

router.put('/collections/:zip_code', collectionController.updateCollection);

router.delete('/collections/:zip_code', collectionController.deleteCollection);

module.exports = router;
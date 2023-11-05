const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');

router.get('/collections', collectionController.getAllCollections);

module.exports = router;
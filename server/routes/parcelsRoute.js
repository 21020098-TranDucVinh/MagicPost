const express = require('express');
const parcelsController = require('../controllers/parcelsController');
const router = express.Router();


router.get('/parcels', parcelsController.getAllParcels);
router.get('/parcels/:id', parcelsController.getParcelById);

router.post('/parcels', parcelsController.createParcel);

module.exports = router;
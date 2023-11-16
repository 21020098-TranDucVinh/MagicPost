const express = require('express');
const parcelsController = require('../controllers/parcelsController');
const router = express.Router();


router.get('/parcels', parcelsController.getAllParcels);
router.get('/parcels/:id', parcelsController.getParcelById);

router.post('/parcels/:transaction_zip_code', parcelsController.createParcel);
router.put('/parcels/:parcel_id', parcelsController.updateParcel);
router.delete('/parcels/:parcel_id', parcelsController.deleteParcel)

module.exports = router;
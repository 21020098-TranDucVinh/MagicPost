const express = require('express');
const parcelsController = require('../controllers/parcelsController');
const router = express.Router();

router.get('/parcels', parcelsController.getAllParcels);

router.get('/parcelsPending', parcelsController.getAllParcelsPending);
router.get('/parcelsShipping', parcelsController.getAllParcelsShipping);
router.get('/parcelsDelivering', parcelsController.getAllParcelsDelivering);
router.get('/parcelsDelivered', parcelsController.getAllParcelsDelivered);
router.get('/parcelsReturned', parcelsController.getAllParcelsReturned);

router.get('/parcels/:id', parcelsController.getParcelById);

router.post('/parcels', parcelsController.createParcel);
router.put('/parcels/:parcel_id', parcelsController.updateParcel);

module.exports = router;

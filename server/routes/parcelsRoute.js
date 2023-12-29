const express = require('express');
const parcelsController = require('../controllers/parcelsController');
const router = express.Router();

router.get('/parcels', parcelsController.getAllParcels);

router.get('/allParcelsPending', parcelsController.getAllParcelsPending);
router.get('/allParcelsShipping', parcelsController.getAllParcelsShipping);
router.get('/allParcelsDelivering', parcelsController.getAllParcelsDelivering);
router.get('/allParcelsDelivered', parcelsController.getAllParcelsDelivered);
router.get('/allParcelsReturned', parcelsController.getAllParcelsReturned);

router.get('/allParcelByTransaction/:s_zip_code', parcelsController.getAllParcelByTransaction)

router.get('/parcels/:id', parcelsController.getParcelById);

router.post('/parcels', parcelsController.createParcel);
router.get('/parcelsPendingByTransaction/:s_zip_code', parcelsController.getAllParcelsPendingByTransaction)
router.put('/parcels/', parcelsController.updateParcel);

module.exports = router;

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
router.get('/parcelsDeliveringByTransaction/:s_zip_code', parcelsController.getParcelsDeliveringByTransaction)
router.get('/parcelsPendingByTransaction/:s_zip_code', parcelsController.getParcelsPendingByTransaction)
router.get('/parcelsShippingByTransaction/:s_zip_code', parcelsController.getParcelsShippingByTransaction)
router.get('/parcelsDeliveredByTransaction/:s_zip_code', parcelsController.getParcelsDeliveredByTransaction)
router.get('/parcelsReturnedByTransaction/:s_zip_code', parcelsController.getParcelsReturnedByTransaction)

// statistic
router.get('/statisticParcels', parcelsController.statisticParcels);
router.get('/statisticParcelsByTransaction/:s_zip_code', parcelsController.statisticParcelsByTransaction);
router.get('/statisticParcelsByCollection/:s_zip_code', parcelsController.statisticParcelsByCollection);

router.get('/parcels/:id', parcelsController.getParcelById);

router.post('/parcels', parcelsController.createParcel);

router.put('/parcels/', parcelsController.updateParcel);

module.exports = router;

const express = require('express');
const trackingController = require('../controllers/trackingController');
const router = express.Router();

router.post('/tracking/send', trackingController.sendTracking);

router.get('/tracking/listDeliveringSent/:s_zip_code', trackingController.getDeliveringTrackingFromSender);
router.get('/tracking/listDeliveringReceiver/:r_zip_code', trackingController.getDeliveredTrackingFromReceiver);
router.get('/tracking/listReceived/:zip_code', trackingController.receivedTracking);
router.get('/tracking/listReturned/:zip_code', trackingController.returnedTracking);
router.get('/tracking/listSended/:zip_code', trackingController.sendedTracking);

router.get('/tracking/:parcel_id', trackingController.getTrackingByParcelId);

router.put('/tracking/receive', trackingController.receiveTracking);
router.get('/tracking/parcelPending/:zip_code', trackingController.getParcelPendingByZip_code);

router.put('/tracking/return', trackingController.returnTracking);

module.exports = router;

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

router.post('/tracking/receive', trackingController.receiveTracking);

module.exports = router;

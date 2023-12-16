const { where } = require('sequelize');
const {
  models: { Tracking, Parcels },
} = require('../models/');

class trackingController {

  // [POST] /tracking/send
  async sendTracking(req, res) {
    try {
      // bulk create
      const { staff_id, s_zip_code, r_zip_code,
        list_parcel_id, shipper_name, shipper_phone } = req.body;
      const list = list_parcel_id.map((parcel_id) => ({
        s_staff_id: staff_id,
        s_zip_code,
        r_zip_code,
        parcel_id,
        shipper_name,
        shipper_phone,
        last_staff_id_update: staff_id,
      }));
      await Tracking.bulkCreate(list);

      res.status(200).json({
        errorCode: 0,
        msg: 'Tracking sent successfully !',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        msg: 'Server' + error.message,
      });
    }
  }

  // [GET] /tracking/listDelivering/:s_zip_code
  async getDeliveringTrackingFromSender(req, res) {
    try {
      const { s_zip_code } = req.params;
      const list = await Tracking.findAll({
        where: {
          s_zip_code,
          status: 'DELIVERING',
        },
      });
      res.status(200).json({
        errorCode: 0,
        msg: 'Get delivering tracking successfully !',
        data: list,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        msg: 'Server' + error.message,
      });
    }
  }

  // [GET] /tracking/listDelivering/:r_zip_code
  async getDeliveredTrackingFromReceiver(req, res) {
    try {
      const { r_zip_code } = req.params;
      const list = await Tracking.findAll({
        where: {
          r_zip_code,
          status: 'DELIVERING',
        },
      });
      res.status(200).json({
        errorCode: 0,
        msg: 'Get delivering tracking successfully !',
        data: list,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        msg: 'Server' + error.message,
      });
    }
  }

  // [GET] /tracking/listReceived/:zip_code
  async receivedTracking(req, res) {
    try {
      const { zip_code } = req.params;
      const list = await Tracking.findAll({
        where: {
          r_zip_code: zip_code,
          status: 'DELIVERED',
        },
      });
      res.status(200).json({
        errorCode: 0,
        msg: 'Get received tracking successfully !',
        data: list,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        msg: 'Server' + error.message,
      });
    }
  }

  // [GET] /tracking/listReturned/:zip_code
  async returnedTracking(req, res) {
    try {
      const { zip_code } = req.params;
      const list = await Tracking.findAll({
        where: {
          r_zip_code: zip_code,
          status: 'RETURNED',
        },
      });
      res.status(200).json({
        errorCode: 0,
        msg: 'Get returned tracking successfully !',
        data: list,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        msg: 'Server' + error.message,
      });
    }
  }

  // [GET] /tracking/listSended/:zip_code
  async sendedTracking(req, res) {
    try {
      const { zip_code } = req.params;
      const list = await Tracking.findAll({
        where: {
          s_zip_code: zip_code,
        },
      });
      res.status(200).json({
        errorCode: 0,
        msg: 'Get sended tracking successfully !',
        data: list,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        msg: 'Server' + error.message,
      });
    }
  }

  // [GET] /tracking/:parcel_id
  async getTrackingByParcelId(req, res) {
    try {
      const { parcel_id } = req.params;
      const tracking = await Tracking.findAll({
        where: {
          parcel_id,
        },
        order: [['id', 'DESC']],
      });
      res.status(200).json({
        errorCode: 0,
        msg: 'Get tracking successfully !',
        data: tracking,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        msg: 'Server' + error.message,
      });
    }
  }

  // [POST] /tracking/receive
  async receiveTracking(req, res) {
    try {
      const { last_staff_id_update, list_tracking_id, zip_code } = req.body;
      const list = list_tracking_id.map((id) => ({
        id,
        s_staff_id: last_staff_id_update,
        s_zip_code: 'T00001',
        r_zip_code: zip_code,
        status: 'DELIVERED',
        last_staff_id_update,
      }));
      await Tracking.bulkCreate(list, {
        updateOnDuplicate: ['status', 'last_staff_id_update'],
      });
      res.status(200).json({
        errorCode: 0,
        msg: 'Tracking received successfully !',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        msg: 'Server' + error.message,
      });
    }
  }

  async getParcelPendingByZip_code(req, res) {
    try {
      const { zip_code } = req.params;
      const trackingEntries = await Tracking.findAll({
        where: {
          s_zip_code: zip_code,
          
        }
      });
  
      // Extract parcel IDs from tracking entries
      const parcelIds = trackingEntries.map(entry => entry.parcel_id);
  
      // Query the Parcels table with an array of parcel IDs
      const parcels = await Parcels.findAll({
        where: {
          parcel_id: parcelIds,
          status: "PENDING"
        }
      });
  
      res.status(200).json({
        errorCode: 0,
        msg: 'Get Pending Parcel successfully!',
        data: parcels,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        msg: 'Server' + error.message,
      });
    }
  }
  

}

module.exports = new trackingController();

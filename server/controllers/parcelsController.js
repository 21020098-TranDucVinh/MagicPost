const {
  models: { Parcels },
} = require('../models');

class parcelsController {
  // [GET] /parcels
  async getAllParcels(req, res) {
    try {
      const parcels = await Parcels.findAndCountAll({
        attribute: { exclude: ['id'] }
      });
      res.status(200).json({
        errorCode: 0,
        count: parcels.count,
        parcels: parcels.rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        message: error.message
      });
    }
  }

  // [GET] /parcels/:id
  async getParcelById(req, res) {
    try {
      const id = req.params.id;
      const parcel = await Parcels.findAll({
        where: { parcel_id: id },
        attributes: { exclude: ['id'] },
      });
      if (parcel.length === 0) {
        res.status(404).json({
          errorCode: 1,
          message: 'No parcel found with id = ' + id,
        });
      } else {
        res.status(200).json({
          errorCode: 0,
          parcel,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        message: error.message
      });
    }
  }

  // [GET] /parcelsPending
  async getAllParcelsPending(req, res) {
    try {
      const parcels = await Parcels.findAndCountAll({
        where: { status: 'PENDING' },
        attribute: { exclude: ['id'] }
      });
      res.status(200).json({
        errorCode: 0,
        count: parcels.count,
        parcels: parcels.rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        message: error.message
      });
    }
  }

  // [GET] /parcelsShipping
  async getAllParcelsShipping(req, res) {
    try {
      const parcels = await Parcels.findAndCountAll({
        where: { status: 'SHIPPING' },
        attribute: { exclude: ['id'] }
      });
      res.status(200).json({
        errorCode: 0,
        count: parcels.count,
        parcels: parcels.rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        message: error.message
      });
    }
  }

  // [GET] /parcelsDelivering
  async getAllParcelsDelivering(req, res) {
    try {
      const parcels = await Parcels.findAndCountAll({
        where: { status: 'DELIVERING' },
        attribute: { exclude: ['id'] }
      });
      res.status(200).json({
        errorCode: 0,
        count: parcels.count,
        parcels: parcels.rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        message: error.message
      });
    }
  }

  // [GET] /parcelsDelivered
  async getAllParcelsDelivered(req, res) {
    try {
      const parcels = await Parcels.findAndCountAll({
        where: { status: 'DELIVERED' },
        attribute: { exclude: ['id'] }
      });
      res.status(200).json({
        errorCode: 0,
        count: parcels.count,
        parcels: parcels.rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        message: error.message
      });
    }
  }

  // [GET] /parcelsReturned
  async getAllParcelsReturned(req, res) {
    try {
      const parcels = await Parcels.findAndCountAll({
        where: { status: 'RETURNED' },
        attribute: { exclude: ['id'] }
      });
      res.status(200).json({
        errorCode: 0,
        count: parcels.count,
        parcels: parcels.rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        message: error.message
      });
    }
  }

  // [POST] /parcels
  async createParcel(req, res) {
    try {
      const { s_name, s_phone, s_address, r_name, r_phone, r_address,
        type, weight, s_zip_code, cost, payment_status } = req.body;
      if (!s_name || !s_phone || !s_address || !r_name || !r_phone || !r_address ||
        !type || !weight || !s_zip_code || !cost || !payment_status) {
        res.status(400).json({
          errorCode: 1,
          message: 'Missing required field(s)'
        });
      }

      const parcel = await Parcels.create({
        s_name, s_phone, s_address,
        r_name, r_phone, r_address,
        type, weight, s_zip_code, cost, payment_status
      });
      res.status(201).json({
        errorCode: 0,
        parcel
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        message: error.message
      });
    }
  }
}

module.exports = new parcelsController();
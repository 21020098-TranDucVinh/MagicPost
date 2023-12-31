const { Op } = require("sequelize");
const {
  models: { Parcels, Tracking },
} = require('../models');

class parcelsController {
  // [GET] /parcels
  async getAllParcels(req, res) {
    try {
      const parcels = await Parcels.findAndCountAll({
        attribute: { exclude: ['id'] },
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
        msg: 'Server' + error.message,
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
          msg: 'No parcel found with id = ' + id,
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
        msg: 'Server' + error.message,
      });
    }
  }

  // [GET] /parcelsPending
  async getAllParcelsPending(req, res) {
    try {
      const parcels = await Parcels.findAndCountAll({
        where: { status: 'PENDING' },
        attribute: { exclude: ['id'] },
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
        msg: 'Server' + error.message,
      });
    }
  }

  // [GET] /parcelsShipping
  async getAllParcelsShipping(req, res) {
    try {
      const parcels = await Parcels.findAndCountAll({
        where: { status: 'SHIPPING' },
        attribute: { exclude: ['id'] },
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
        msg: 'Server' + error.message,
      });
    }
  }

  // [GET] /parcelsDelivering
  async getAllParcelsDelivering(req, res) {
    try {
      const parcels = await Parcels.findAndCountAll({
        where: { status: 'DELIVERING' },
        attribute: { exclude: ['id'] },
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
        msg: 'Server' + error.message,
      });
    }
  }

  // [GET] /parcelsDelivered
  async getAllParcelsDelivered(req, res) {
    try {
      const parcels = await Parcels.findAndCountAll({
        where: { status: 'DELIVERED' },
        attribute: { exclude: ['id'] },
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
        msg: 'Server' + error.message,
      });
    }
  }

  // [GET] /parcelsReturned
  async getAllParcelsReturned(req, res) {
    try {
      const parcels = await Parcels.findAndCountAll({
        where: { status: 'RETURNED' },
        attribute: { exclude: ['id'] },
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
        msg: 'Server' + error.message,
      });
    }
  }

  // [POST] /parcels
  async createParcel(req, res) {
    try {
      const {
        s_name,
        s_phone,
        s_address,
        r_name,
        r_phone,
        r_address,
        type,
        weight,
        s_zip_code,
        r_zip_code,
        cost,
        cod,
        bonus,
      } = req.body;
      // if (!s_name || !s_phone || !s_address || !r_name || !r_phone || !r_address ||
      //   !type || !weight || !s_zip_code || !cost || !payment_status) {
      //   res.status(400).json({
      //     errorCode: 1,
      //     message: 'Missing required field(s)'
      //   });
      // }

      await Parcels.create({
        s_name,
        s_phone,
        s_address: s_address,
        r_name,
        r_phone,
        r_address: r_address,
        type,
        weight,
        s_zip_code,
        r_zip_code,
        cost,
        r_cod: {
          cod: cod,
          bonus: bonus,
        },
      });

      res.status(201).json({
        errorCode: 0,
        msg: 'New parcel created successfully',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        msg: 'Server' + error.message,
      });
    }
  }

  // [PUT] /parcels/
  async updateParcel(req, res) {
    try {
      const { list_parcel_id, last_shipper_name, last_shipper_phone } = req.body;
      await Tracking.update({
        status: 'DONE'
      }, {
        where: { 
          parcel_id: list_parcel_id,
          status: 'DELIVERED'
        }
      });
      await Parcels.update(
        {
          status: 'DELIVERING',
          last_shipper_name,
          last_shipper_phone,
        },
        {
          where: { parcel_id: list_parcel_id },
          returning: true, // to return the object
          plain: true, // return the object itself and not the other messy meta data that might not be useful.
        },
      )
        .then((parcel) => {
          console.log(parcel);
          return res.status(201).json({
            errorCode: 0,
            msg: 'Parcel updated successfully',
          });
        })
        .catch((error) => {
          console.log(error);
          // catch error from unique constraint
          res.status(400).json({
            errorCode: 1,
            msg: error.errors[0].message,
          });
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        msg: 'Server' + error.message,
      });
    }
  }

  async getParcelsPendingByTransaction(req, res) {
    try {
      const {s_zip_code} = req.params
      const parcels = await Parcels.findAndCountAll({
        where: { status: 'PENDING', s_zip_code },
        attribute: { exclude: ['id'] },
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
        msg: 'Server' + error.message,
      });
    }
  }

  // [GET] /allParcelByTransaction/:s_zip_code
  async getAllParcelByTransaction(req, res) {
    try {
      const {s_zip_code} = req.params
      const parcels = await Parcels.findAndCountAll({
        where: { s_zip_code },
        attribute: { exclude: ['id'] },
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
        msg: 'Server' + error.message
      });
    }
  }

  // [GET] /statisticParcels
  async statisticParcels(req, res) {
    try {
      const parcels = await Parcels.findAndCountAll({
        attribute: { exclude: ['id'] },
      });
      res.status(200).json({
        errorCode: 0,
        count: parcels.count,
        pendingSentCount: parcels.rows.filter(parcel => parcel.status === 'PENDING').length,
        shippingSentCount: parcels.rows.filter(parcel => parcel.status === 'SHIPPING').length,
        deliveringSentCount: parcels.rows.filter(parcel => parcel.status === 'DELIVERING').length,
        deliveredSentCount: parcels.rows.filter(parcel => parcel.status === 'DELIVERED').length,
        returnedSentCount: parcels.rows.filter(parcel => parcel.status === 'RETURNED').length,
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({
        errorCode: 1,
        msg: 'Server' + error.message
      });
    }
  }

  // [GET] /statisticParcelsByTransaction/:s_zip_code
  async statisticParcelsByTransaction(req, res) {
    try {
      const {s_zip_code} = req.params
      const parcels = await Parcels.findAndCountAll({
        where: {
          [Op.or]: [
            { s_zip_code: s_zip_code },
            { r_zip_code: s_zip_code },
          ],
        },
        attribute: { exclude: ['id'] },
      });
      res.status(200).json({
        errorCode: 0,
        count: parcels.count,
        pendingSentCount: parcels.rows.filter(parcel => parcel.status === 'PENDING').length,
        shippingSentCount: parcels.rows.filter(parcel => parcel.status === 'SHIPPING' && parcel.s_zip_code === s_zip_code).length,
        shippingReceivedCount: parcels.rows.filter(parcel => parcel.status === 'SHIPPING' && parcel.r_zip_code === s_zip_code).length,
        deliveringSentCount: parcels.rows.filter(parcel => parcel.status === 'DELIVERING' && parcel.s_zip_code === s_zip_code).length,
        deliveringReceivedCount: parcels.rows.filter(parcel => parcel.status === 'DELIVERING' && parcel.r_zip_code === s_zip_code).length,
        deliveredSentCount: parcels.rows.filter(parcel => parcel.status === 'DELIVERED' && parcel.s_zip_code === s_zip_code).length,
        deliveredReceivedCount: parcels.rows.filter(parcel => parcel.status === 'DELIVERED' && parcel.r_zip_code === s_zip_code).length,
        returnedSentCount: parcels.rows.filter(parcel => parcel.status === 'RETURNED' && parcel.s_zip_code === s_zip_code).length,
        returnedReceivedCount: parcels.rows.filter(parcel => parcel.status === 'RETURNED' && parcel.r_zip_code === s_zip_code).length,
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({
        errorCode: 1,
        msg: 'Server' + error.message
      });
    }
  }

  // [GET] /statisticParcelsByCollection/:s_zip_code
  async statisticParcelsByCollection(req, res) {
    try {
      const {s_zip_code} = req.params
      const tracking = await Tracking.findAndCountAll({
        where: { s_zip_code },
        attribute: { exclude: ['id'] },
      });
      res.status(200).json({
        errorCode: 0,
        count: tracking.count,
        deliveringSentCount: tracking.rows.filter(track => track.status === 'DELIVERING' && track.s_zip_code === s_zip_code).length,
        deliveringReceivedCount: tracking.rows.filter(track => track.status === 'DELIVERING' && track.r_zip_code === s_zip_code).length,
        deliveredSentCount: tracking.rows.filter(track => track.status === 'DELIVERED' && track.s_zip_code === s_zip_code).length,
        deliveredReceivedCount: tracking.rows.filter(track => track.status === 'DELIVERED' && track.r_zip_code === s_zip_code).length,
        returnedSentCount: tracking.rows.filter(track => track.status === 'RETURNED' && track.s_zip_code === s_zip_code).length,
        returnedReceivedCount: tracking.rows.filter(track => track.status === 'RETURNED' && track.r_zip_code === s_zip_code).length,
      });
  } catch (error) {
      console.log(error)
      res.status(500).json({
        errorCode: 1,
        msg: 'Server' + error.message
      });
    }
  }

  // [GET] /allParcelsDeliveringByTransaction/:s_zip_code
  async getParcelsDeliveringByTransaction(req, res) {
    try {
      const {s_zip_code} = req.params
      const parcels = await Parcels.findAndCountAll({
        where: { status: 'DELIVERING', s_zip_code },
        attribute: { exclude: ['id'] },
      });
      res.status(200).json({
        errorCode: 0,
        count: parcels.count,
        parcels: parcels.rows,
      });
  } catch (error) {
      console.log(error)
      res.status(500).json({
        errorCode: 1,
        msg: 'Server' + error.message
      });
    }
  }

  // [GET] /parcelsShippingByTransaction/:s_zip_code
  async getParcelsShippingByTransaction(req, res) {
    try {
      const {s_zip_code} = req.params
      const parcels = await Parcels.findAndCountAll({
        where: { status: 'SHIPPING', s_zip_code },
        attribute: { exclude: ['id'] },
      });
      res.status(200).json({
        errorCode: 0,
        count: parcels.count,
        parcels: parcels.rows,
      });
  } catch (error) {
      console.log(error)
      res.status(500).json({
        errorCode: 1,
        msg: 'Server' + error.message
      });
    }
  }

  // [GET] /parcelsDeliveredByTransaction/:s_zip_code
  async getParcelsDeliveredByTransaction(req, res) {
    try {
      const {s_zip_code} = req.params
      const parcels = await Parcels.findAndCountAll({
        where: { status: 'DELIVERED', s_zip_code },
        attribute: { exclude: ['id'] },
      });
      res.status(200).json({
        errorCode: 0,
        count: parcels.count,
        parcels: parcels.rows,
      });
  } catch (error) {
      console.log(error)
      res.status(500).json({
        errorCode: 1,
        msg: 'Server' + error.message
      });
    }
  }

  // [GET] /parcelsReturnedByTransaction/:s_zip_code
  async getParcelsReturnedByTransaction(req, res) {
    try {
      const {s_zip_code} = req.params
      const parcels = await Parcels.findAndCountAll({
        where: { status: 'RETURNED', s_zip_code },
        attribute: { exclude: ['id'] },
      });
      res.status(200).json({
        errorCode: 0,
        count: parcels.count,
        parcels: parcels.rows,
      });
  } catch (error) {
      console.log(error)
      res.status(500).json({
        errorCode: 1,
        msg: 'Server' + error.message
      });
    }
  }


}

module.exports = new parcelsController();

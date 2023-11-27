const {
  models: { Parcels, Transaction, Collection },
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
        s_district,
        s_city,
        s_address,
        r_name,
        r_phone,
        r_district,
        r_city,
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
        s_address: {
          s_district: s_district,
          s_city: s_city,
          s_address: s_address,
        },
        r_name,
        r_phone,
        r_address: {
          r_district: r_district,
          r_city: r_city,
          r_address: r_address,
        },
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

  async updateParcel(req, res) {
    try {
      const parcel_id = req.params.parcel_id;
      const { status } = req.body;

      await Parcels.update(
        {
          status,
        },
        {
          where: { parcel_id },
          returning: true, // to return the object
          plain: true, // return the object itself and not the other messy meta data that might not be useful.
        },
      )
        .then((parcel) => {
          console.log(parcel);
          return res.status(201).json({
            errorCode: 0,
            parcel,
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
}

module.exports = new parcelsController();

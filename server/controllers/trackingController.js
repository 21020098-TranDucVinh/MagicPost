const { where } = require('sequelize');
const {
  models: { Tracking, Parcels }
} = require('../models/');

class trackingController {
  async customerToTransaction(req, res) {
    try {
      const s_staff_id = req.params.s_staff_id;
      const {
        s_name, s_phone, s_district, s_city, s_address,
        r_name, r_phone, r_district, r_city, r_address,
        type, weight, s_zip_code, r_zip_code, cost, cod, bonus
      } = req.body;
  
      const s_addressObj = {
        s_district: s_district,
        s_city: s_city,
        s_address: s_address
      };
  
      const r_addressObj = {
        r_district: r_district,
        r_city: r_city,
        r_address: r_address
      };
  
      const parcel = await Parcels.create({
        s_name, s_phone,
        s_address: s_addressObj,
        r_name, r_phone,
        r_address: r_addressObj,
        type, weight, s_zip_code, r_zip_code, cost,
        r_cod: {
          cod: cod,
          bonus: bonus
        },
      });

      const tracking = await Tracking.create({
        s_staff_id,
        last_staff_id_update:s_staff_id,
        parcel_id: parcel.id

      });
      res.status(200).json({
        message: 'Transaction created successfully',
        parcel,
        tracking
      });

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({
        errorCode: 500,
        message: 'Internal server error'
      });
    }
  }
  
  async TransactionToCollection(req,res) {
    try{
      const {parcel_id, r_zip_code} = req.body;

      const tracking = await Tracking.update({
        r_zip_code,
      }, {
        where:{
          parcel_id
        }
      })
      res.status(200).json({
        message: 'Transaction created successfully',
        tracking
      });
    }catch(error){
      console.log(error)
    }
  }

  async CollectionToCollection(req,res) {
    try{
      const {staff_id, parcel_id, r_zip_code} = req.body;

      const tracking = await Tracking.findOne({
        
        where:{
          parcel_id
        }
      })


      const last_update = [tracking.last_staff_id_update]
      last_update.push(staff_id);

      const update_tracking = await Tracking.update({
        r_zip_code,
        last_staff_id_update:last_update
      }, {
        where:{
          parcel_id
      }})
      res.status(200).json({
        message: 'Transaction created successfully',
        tracking
      });
    }catch(error){
      console.log(error)
    }
  }
}

module.exports = new trackingController();
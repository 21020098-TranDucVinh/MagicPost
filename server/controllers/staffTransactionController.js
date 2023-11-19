const {
    models: { Parcels, Transaction, Collection, StaffCollection, StaffTransaction },
  } = require('../models');
  
  class staffTransactionController {
    // [GET] /parcels
    async test(req,res){
      try{
        const {parcel_id, status} = req.body;
        const staff_transaction = await StaffTransaction.create({
          from_collection:{
            parcel_id : parcel_id,
            status :status,
          }
        })
      } catch(error){
        console.log(error)
      }
    }
  
    // [POST] /parcels
    async parcelFromCollection(req, res){
      try{
        const {parcel_id, staff_id} = req.body;
        const parcel = await StaffTransaction.update({
          r_staff_id: staff_id,
          from_collection:{
            parcel_id : parcel_id,
            
            status : "OK"
          }}, {
            where:{
              from_collection:{
                parcel_id:parcel_id
              }
          }
        })
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
  
    // parcel bi xoa o bang StaffCollection ? -> tracking
  }
  
  module.exports = new staffTransactionController();
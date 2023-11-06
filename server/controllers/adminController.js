const { col, Transaction } = require('sequelize');
const {
    models: { Admin, Collection },
} = require('../models');
const collectionModel = require('../models/collectionModel');

class adminController {
    // create username & password -> magic_post.admin
    // [POST] /admin
    async createAdmin(req, res) {
        try {
            const {username, password, phone} = req.body;
            if(!username || !password || !phone){
                res.status(400).send({message: "Missing required field(s)"});
            }
            await Admin.create({
                username,
                password,
                phone,
            }).then((admin) => {
                console.log(admin);
                return res.status(201).json({
                    msg: 'New admin created successfully',
                    admin,
                });
            }).catch((error) =>{
                console.log(error);
                return res.status(500).json({
                    msg:'Cannot  create new admin!',
                });
            });
        } catch(error){
            console.log(error)
        }
    }

    // duplicate username
    // can login

    async getAdminPending(req,res ){
        try{
            const admin = await Admin.findAll({
                where:{
                    role:'PENDING'
                }
            });
            return res.status(200).send(admin)
        }catch(error){
            console.log(error)
        }
    }
    //

    async getAdminByCollectionId(req,res){
        try{
            const zip_code = req.params.zip_code;
            const collection = await Collection.findOne({
                where:{
                    zip_code,
                }
            });
            const admin = await Admin.findOne({
                where:{
                    id:collection.admin_id
                }
            });
            return res.status(200).send(admin);
        }catch(error){
            console.log(error);
            return res.status(500).json({ message: 'Error showing admin_collection!' });
        }
    }
    

    //transaction


    async getAdminByTransactionId(req,res){
        try{
            const zip_code = req.params.zip_code;
            const transaction = await Collection.findOne({
                where:{
                    zip_code,
                }
            });
            const admin = await Admin.findOne({
                where:{
                    id:transaction.admin_id
                }
            });
            return res.status(200).send(admin);
        }catch(error){
            console.log(error);
            return res.status(500).json({ message: 'Error showing admin_transaction!' });
        }
    }


}

module.exports = new adminController();
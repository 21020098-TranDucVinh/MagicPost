const {
    models: { Admin, Collection, Transaction },
} = require('../models');

class adminController {
    // create username & password -> magic_post.admin
    // [POST] /admin
    async createAdmin(req, res) {
        try {
            const { username, password, phone } = req.body;
            if (!username || !password || !phone) {
                res.status(400).json({
                    errorCode: 1,
                    message: "Missing required field(s)"
                });
            }
            await Admin.create({
                username,
                password,
                phone,
            }).then((admin) => {
                console.log(admin);
                return res.status(201).json({
                    errorCode: 0,
                    msg: 'New admin created successfully',
                    admin,
                });
            }).catch((error) => {
                console.log(error);
                return res.status(500).json({
                    errorCode: 1,
                    msg: 'Cannot  create new admin!',
                });
            });
        } catch (error) {
            console.log(error)
        }
    }

    // duplicate username
    // can login

    async getAdminPending(req, res) {
        try {
            const admin = await Admin.findAll({
                where: {
                    role: 'PENDING'
                }
            });
            return res.status(200).json({
                errorCode: 0,
                admin
            });
        } catch (error) {
            console.log(error)
        }
    }
    //

    async getAdminByCollectionId(req, res) {
        try {
            const zip_code = req.params.zip_code;
            const collection = await Collection.findOne({
                where: {
                    zip_code,
                }
            });
            const admin = await Admin.findOne({
                where: {
                    id: collection.admin_id
                }
            });
            return res.status(200).json({
                errorCode: 0,
                admin
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                errorCode: 1,
                message: 'Error showing admin_collection!'
            });
        }
    }


    //transaction


    async getAdminByTransactionId(req, res) {
        try {
            const zip_code = req.params.zip_code;
            const transaction = await Transaction.findOne({
                where: {
                    zip_code,
                }
            });
            const admin = await Admin.findOne({
                where: {
                    id: transaction.admin_id
                }
            });
            return res.status(200).json({
                errorCode: 0,
                admin
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                errorCode: 1,
                message: 'Error showing admin_transaction!'
            });
        }
    }

    async updateAdmin(req, res) {
        try {
          const id = req.params.id;
          const { username, password, phone } = req.body;
          if (!username || !password || !phone) {
            res.status(400).json({
              errorCode: 1,
              message: 'Missing required field(s)'
            });
          }
    
          await Admin.update({
            username, password, phone
          }, {
            where: { id },
            returning: true, // to return the object
            plain: true // return the object itself and not the other messy meta data that might not be useful.
          }).then((admin) => {
            console.log(admin);
            return res.status(201).json({
              errorCode: 0,
              admin
            });
          }).catch((error) => {
            console.log(error);
            // catch error from unique constraint
            res.status(400).json({
              errorCode: 1,
              message: error.errors[0].message
            });
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({
            errorCode: 1,
            message: 'Something went wrong with server'
          });
        }
      }
    
    async deleteAdmin(req, res) {
        try {
          const id = req.params.id;
          const admin = await Admin.destroy({
            where: { id }
          });
          if (admin === 0) {
            return res.status(404).json({
              errorCode: 1,
              message: 'Admin not found with this id'
            });
          }
          res.status(200).json({
            errorCode: 0,
            message: 'Delete admin successfully'
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({
            errorCode: 1,
            message: 'Something went wrong with server'
          });
        }
    }

}

module.exports = new adminController();
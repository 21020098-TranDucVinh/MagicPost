const {
  models: { Admin, Collection, Transaction },
} = require("../models");

class adminController {
  // create username & password -> magic_post.admin
  // [POST] /admin
  async createAdmin(req, res) {
    try {
      const { username, password, phone } = req.body;
      if (!username || !password || !phone) {
        res.status(400).json({
          errorCode: 1,
          message: "Missing required field(s)",
        });
      }
      await Admin.create({
        username,
        password,
        phone,
      })
        .then((admin) => {
          console.log(admin);
          return res.status(201).json({
            errorCode: 0,
            msg: "New admin created successfully",
            admin,
          });
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({
            errorCode: 1,
            msg: "Cannot  create new admin!",
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  // duplicate username
  // can login
  async getAllAdminTransition(req, res) {
    try {
      const admin = await Admin.findAll({
        where: {
          role: "TRANSACTION_ADMIN",
        },
      });
      return res.status(200).json({
        errorCode: 0,
        data: admin,
        msg: "Get all admin transaction success!",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllAdminCollection(req, res) {
    try {
      const collection = await Admin.findAll({
        where: {
          role: "COLLECTION_ADMIN",
        },
      });
      return res.status(200).json({
        errorCode: 0,
        data: collection,
        msg: "Get all admin transaction success!",
      });
    } catch (error) {
      console.log(error);
    }
  }
  async getAdminPending(req, res) {
    try {
      const admin = await Admin.findAll({
        where: {
          role: "PENDING",
        },
      });
      return res.status(200).json({
        errorCode: 0,
        admin,
      });
    } catch (error) {
      console.log(error);
    }
  }
  //

  async getAdminByCollectionId(req, res) {
    try {
      const zip_code = req.params.zip_code;
      const collection = await Collection.findOne({
        where: {
          zip_code,
        },
      });
      const admin = await Admin.findOne({
        where: {
          id: collection.admin_id,
        },
      });
      return res.status(200).json({
        errorCode: 0,
        admin,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        errorCode: 1,
        message: "Error showing admin_collection!",
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
        },
      });
      const admin = await Admin.findOne({
        where: {
          id: transaction.admin_id,
        },
      });
      return res.status(200).json({
        errorCode: 0,
        admin,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        errorCode: 1,
        message: "Error showing admin_transaction!",
      });
    }
  }
}

module.exports = new adminController();

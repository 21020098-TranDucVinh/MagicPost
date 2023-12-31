const {
  models: { Admin, Collection, Transaction },
} = require('../models');
const bcrypt = require('bcryptjs');

class adminController {
  // create username & password -> magic_post.admin
  // [POST] /admin
  async createAdmin(req, res) {
    try {
      const { username, password, phone } = req.body;
      if (!username || !password || !phone) {
        res.status(400).json({
          errorCode: 1,
          msg: 'Missing required field(s)',
        });
      }
      bcrypt.hash(password, 10).then(async (hash) => {
        await Admin.create({
          username,
          password: hash,
          phone,
        }).then(() => {
          res.status(200).json({
            errorCode: 0,
            msg: 'Create admin successful',
          });
        }).catch((err) => {
          res.status(400).json({
            errorCode: 1,
            msg: err.errors[0].message,
          });
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        msg: 'Server:' + error.message,
      });
    }
  }

  // duplicate username
  // can login
  // [GET] /adminPending
  async getAdminPending(req, res) {
    try {
      const admin = await Admin.findAll({
        attributes: {
          exclude: ['password'],
        },
        where: {
          role: 'PENDING',
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
        msg: 'Server:' + error.message,
      });
    }
  }
  //

  // [GET] /admin_collection/:zip_code
  async getAdminByCollectionId(req, res) {
    try {
      const zip_code = req.params.zip_code;
      const collection = await Collection.findOne({
        where: {
          zip_code,
        },
      });
      if (!collection) {
        return res.status(404).json({
          errorCode: 1,
          msg: 'No collection found with zip_code = ' + zip_code,
        });
      }
      const admin = await Admin.findOne({
        attributes: {
          exclude: ['password'],
        },
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
        msg: 'Server:' + error.message,
      });
    }
  }

  //transaction
  // [GET] /admin_transaction/:zip_code
  async getAdminByTransactionId(req, res) {
    try {
      const zip_code = req.params.zip_code;
      const transaction = await Transaction.findOne({
        where: {
          zip_code,
        },
      });
      if (!transaction) {
        return res.status(404).json({
          errorCode: 1,
          msg: 'No transaction found with zip_code = ' + zip_code,
        });
      }
      const admin = await Admin.findOne({
        attributes: {
          exclude: ['password'],
        },
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
        msg: 'Server:' + error.message,
      });
    }
  }

  // [PUT] /admin/:id
  async updateAdmin(req, res) {
    try {
      const id = req.params.id;
      const { username, password, phone } = req.body;
      if (!username || !password || !phone) {
        res.status(400).json({
          errorCode: 1,
          msg: 'Missing required field(s)',
        });
      }
      bcrypt.hash(password, 10).then(async (hash) => {
        await Admin.update(
          {
            username,
            password: hash,
            phone
          },
          {
            where: {
              id,
            },
          },
        ).then(() => {
          res.status(200).json({
            errorCode: 0,
            msg: 'Update admin successful',
          });
        }).catch((err) => {
          res.status(400).json({
            errorCode: 1,
            msg: err.errors[0].message,
          });
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        msg: 'Server:' + error.message,
      });
    }
  }

  // [DELETE] /admin/:id
  async deleteAdmin(req, res) {
    try {
      const id = req.params.id;
      await Admin.destroy({
        where: {
          id,
        },
      }).then(() => {
        res.status(200).json({
          errorCode: 0,
          msg: 'Delete admin successful',
        });
      }).catch((err) => {
        res.status(400).json({
          errorCode: 1,
          msg: err.errors[0].message,
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        msg: 'Server:' + error.message,
      });
    }
  }
}

module.exports = new adminController();

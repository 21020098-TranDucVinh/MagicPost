const {
  models: { Staff },
} = require('../models');
const bcrypt = require('bcryptjs');

class staffController {
  // [POST] /staff
  async createStaff(req, res) {
    try {
      const { username, password, phone, zip_code } = req.body;
      if (!username || !password || !phone || !zip_code) {
        return res.status(400).json({
          errorCode: 1,
          msg: 'Missing required field(s)',
        });
      }

      if (zip_code.startsWith('T')) {
        bcrypt.hash(password, 10).then(async (hash) => {
          await Staff.create({
            username,
            password,
            phone,
            transaction_zip_code: zip_code,
          });

          // Return a success response
          return res.status(200).json({
            errorCode: 0,
            msg: 'Created a new transaction staff successfully!',
          });
        });
      } else if (zip_code.startsWith('C')) {
        bcrypt.hash(password, 10).then(async (hash) => {
          await Staff.create({
            username,
            password,
            phone,
            collection_zip_code: zip_code,
          });

          // Return a success response
          return res.status(200).json({
            errorCode: 0,
            msg: 'Created a new collection staff successfully!',
          });
        });
      }
    } catch (error) {
      console.log(error);
      // Return a 500 status code for server errors
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
          errorCode: 1,
          msg: error.errors[0].message,
        });
      } else if (error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).json({
          errorCode: 1,
          msg: 'Invalid zip code!',
        });
      }
      return res.status(500).json({
        errorCode: 1,
        msg: 'Server' + error.message,
      });
    }
  }

  // [GET] /transaction_staff/:transaction_zip_code
  async getTransactionStaff(req, res) {
    try {
      const transaction_zip_code = req.params.transaction_zip_code;

      const staff = await Staff.findAndCountAll({
        where: {
          transaction_zip_code,
        },
      });
      return res.status(200).json({
        errorCode: 0,
        count: staff.count,
        staff: staff.rows,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        errorCode: 1,
        msg: 'Error find a transaction staff!',
      });
    }
  }

  // [PUT] /staff/:staff_id
  async updateStaff(req, res) {
    try {
      const staff_id = req.params.staff_id;
      const {
        username,
        password,
        phone,
        transaction_zip_code,
        collection_zip_code,
      } = req.body;
      if (!username || !password || !phone) {
        res.status(400).json({
          errorCode: 1,
          msg: 'Missing required field(s)',
        });
      }
      await Staff.update(
        {
          username,
          password,
          phone,
          transaction_zip_code,
          collection_zip_code,
        },
        {
          where: { staff_id },
        },
      );
      res.status(200).json({
        errorCode: 0,
        msg: 'Staff updated successfully',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        msg: 'Error updating staff',
      });
    }
  }

  // [DELETE] /staff/:staff_id
  async deleteStaff(req, res) {
    try {
      const staff_id = req.params.staff_id;
      const staff = await Staff.destroy({
        where: { staff_id },
      });
      if (staff === 0) {
        res.status(404).json({
          errorCode: 1,
          msg: 'No staff found with ID = ' + id,
        });
      } else {
        res.status(200).json({
          errorCode: 0,
          msg: 'Staff deleted successfully',
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
}

module.exports = new staffController();

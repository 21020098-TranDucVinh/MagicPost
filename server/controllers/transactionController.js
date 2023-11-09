const {
  models: { Transaction, Staff },
} = require('../models/');

class transactionController {
  // [GET] /transactions
  async getAllTransactions(req, res) {
    try {
      const transactions = await Transaction.findAll({
        attribute: { exclude: ['id'] }
      });
      res.status(200).json({
        errorCode: 0,
        transactions
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        message: 'Something went wrong with server'
      });
    }
  }

  // [GET] /transactions/:zip_code
  async getTransactionByZipcode(req, res) {
    try {
      const zip_code = req.params.zip_code;
      const transactions = await Transaction.findAll({
        where: { zip_code },
        attributes: { exclude: ['id'] }
      });
      if (transactions.length === 0) {
        res.status(404).json({
          errorCode: 1,
          message: 'No transaction found with zip code = ' + zip_code
        })
      } else {
        res.status(200).json({
          errorCode: 0,
          transactions
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        message: 'Something went wrong with server'
      });
    }
  }

  // [POST] /transactions
  async createTransaction(req, res) {
    try {
      const { name, collection_zip_code, admin_id, address } = req.body;
      if (!name || !collection_zip_code || !admin_id || !address) {
        res.status(400).json({
          errorCode: 1,
          message: 'Missing required field(s)'
        });
      }

      await Transaction.create({
        name,
        collection_zip_code,
        admin_id,
        address,
      }).then((transaction) => {
        console.log(transaction);
        return res.status(201).json({
          errorCode: 0,
          msg: 'Transaction created successfully',
          transaction,
        });
      }).catch((error) => {
        console.log(error);
        return res.status(500).json({
          msg: 'Something went wrong with server',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  // [PUT] /transactions/:zip_code
  async updateTransaction(req, res) {
    try {
      const zip_code = req.params.zip_code;
      const { name, collection_zip_code, admin_id, address } = req.body;
      if (!name || !collection_zip_code || !admin_id || !address) {
        res.status(400).json({
          errorCode: 1,
          message: 'Missing required field(s)'
        });
      }
      const transaction = await Transaction.update({
        name,
        collection_zip_code,
        admin_id,
        address,
      }, {
        where: { zip_code }
      });
      res.status(200).json({
        errorCode: 0,
        transaction
      });
    } catch (error) {
      console.log(error);
      if (error.name === 'SequelizeUniqueConstraintError'
      ) {
        res.status(400).json({
          errorCode: 1,
          message: error.errors[0].message
        });
      }

      if (error.name === 'SequelizeForeignKeyConstraintError') {
        res.status(400).json({
          errorCode: 1,
          message: 'Invalid admin_id or collection_zip_code'
        });
      }
    }
  }

  // [DELETE] /transactions/:zip_code
  async deleteTransaction(req, res) {
    try {
      const zip_code = req.params.zip_code;
      const transaction = await Transaction.destroy({
        where: { zip_code }
      });
      if (transaction === 0) {
        res.status(404).json({
          errorCode: 1,
          message: 'No transaction found with zip code = ' + zip_code
        })
      } else {
        res.status(200).json({
          errorCode: 0,
          message: 'Transaction deleted successfully'
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        message: 'Something went wrong with server'
      });
    }
  }

  // [POST] /transaction_staff
  async storeTransactionStaff(req, res) {
    try {
      const { username, password, phone, zip_code } = req.body;
  
      // Check for an existing staff member with the same username
      const existingStaff = await Staff.findOne({
        where: { username }
      });
  
      if (existingStaff) {
        // If a staff member with the same username is found, return an error
        return res.status(409).json({
          errorCode: 2,
          message: 'Username already exists!'
        });
      }
  
      // If no existing staff with the username is found, create a new staff member
      await Staff.create({
        username,
        password,
        phone,
        transaction_zip_code: zip_code,
      });
  
      // Return a success response
      return res.status(200).json({
        errorCode: 0,
        message: 'Created a new transaction staff successfully!'
      });
    } catch (error) {
      console.log(error);
      // Return a 500 status code for server errors
      return res.status(500).json({
        errorCode: 1,
        message: 'Error creating a new transaction staff!'
      });
    }
  }
  

  async getTransactionStaff(req,res){
    try{
      const transaction_zip_code = req.params.transaction_zip_code;
      
      const staff = await Staff.findAndCountAll({
        where:{
          transaction_zip_code,
        }
      })
      return res.status(200).json({
        errorCode: 0,
        count: staff.count,
        staff: staff.rows,
      })
    } catch(error){
      console.log(error);
      return res.status(500).json({
        errorCode: 1,
        message: 'Error find a transaction staff!'
      })
    }
  }

  async updateTransactionStaff(req, res) {
    try {
      const staff_id = req.params.staff_id;
      const { username, password, phone } = req.body;
      if (!username || !password || !phone ) {
        res.status(400).json({
          errorCode: 1,
          message: 'Missing required field(s)'
        });
      }
      const staff = await Staff.update({
        username,
        password,
        phone,
      }, {
        where: { staff_id }
      });
      res.status(200).json({
        errorCode: 0,
        staff
      });
    } catch (error) {
      console.log(error);
      if (error.name === 'SequelizeUniqueConstraintError'
      ) {
        res.status(400).json({
          errorCode: 1,
          message: error.errors[0].message
        });
      }

      if (error.name === 'SequelizeForeignKeyConstraintError') {
        res.status(400).json({
          errorCode: 1,
          message: 'Invalid transaction_zip_code'
        });
      }
    }
  }


    // [DELETE] /transaction_staff/:id
    async deleteTransactionStaff(req, res) {
      try {
        const staff_id = req.params.staff_id;
        const staff = await Staff.destroy({
          where: { staff_id }
        });
        if (staff === 0) {
          res.status(404).json({
            errorCode: 1,
            message: 'No staff found with ID = ' + id
          })
        } else {
          res.status(200).json({
            errorCode: 0,
            message: 'Staff deleted successfully'
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          errorCode: 1,
          message: 'Something went wrong with server'
        });
      }
    }
  







}

module.exports = new transactionController();
const {
  models: { Transaction, Staff },
} = require('../models/');

class transactionController {
  // [GET] /transactions
  async getAllTransactions(req, res) {
    try {
      const transactions = await Transaction.findAll({
        attribute: { exclude: ['id'] },
      });
      res.status(200).json({
        errorCode: 0,
        transactions,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        msg: 'Server' + error.message,
      });
    }
  }

  // [GET] /transactions/:zip_code
  async getTransactionByZipcode(req, res) {
    try {
      const zip_code = req.params.zip_code;
      const transactions = await Transaction.findAll({
        where: { zip_code },
        attributes: { exclude: ['id'] },
      });
      if (transactions.length === 0) {
        res.status(404).json({
          errorCode: 1,
          msg: 'No transaction found with zip code = ' + zip_code,
        });
      } else {
        res.status(200).json({
          errorCode: 0,
          transactions,
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

  // [POST] /transactions
  async createTransaction(req, res) {
    try {
      const { name, collection_zip_code, admin_id, address } = req.body;
      if (!name || !collection_zip_code || !admin_id || !address) {
        res.status(400).json({
          errorCode: 1,
          msg: 'Missing required field(s)',
        });
      }

      await Transaction.create({
        name,
        collection_zip_code,
        admin_id,
        address,
      });
      res.status(201).json({
        errorCode: 0,
        msg: 'Transaction created successfully',
      });
    } catch (error) {
      console.log(error);
      // catch error from unique constraint
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({
          errorCode: 1,
          msg: error.errors[0].message,
        });
      }
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        res.status(400).json({
          errorCode: 1,
          msg: 'Invalid admin_id or collection_zip_code',
        });
      }
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
          msg: 'Missing required field(s)',
        });
      }
      const transaction = await Transaction.update(
        {
          name,
          collection_zip_code,
          admin_id,
          address,
        },
        {
          where: { zip_code },
        },
      );
      res.status(200).json({
        errorCode: 0,
        transaction,
      });
    } catch (error) {
      console.log(error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({
          errorCode: 1,
          msg: error.errors[0].message,
        });
      }

      if (error.name === 'SequelizeForeignKeyConstraintError') {
        res.status(400).json({
          errorCode: 1,
          msg: 'Invalid admin_id or collection_zip_code',
        });
      }
    }
  }

  // [DELETE] /transactions/:zip_code
  async deleteTransaction(req, res) {
    try {
      const zip_code = req.params.zip_code;
      const transaction = await Transaction.destroy({
        where: { zip_code },
      });
      if (transaction === 0) {
        res.status(404).json({
          errorCode: 1,
          msg: 'No transaction found with zip code = ' + zip_code,
        });
      } else {
        res.status(200).json({
          errorCode: 0,
          msg: 'Transaction deleted successfully',
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

module.exports = new transactionController();

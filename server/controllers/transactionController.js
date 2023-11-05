const {
  models: { Transaction },
} = require('../models/');

class transactionController {
  // [GET] /transactions
  async getAllTransactions(req, res) {
    try {
      const transactions = await Transaction.findAll({
        attribute: { exclude: ['id'] }
      });
      if (transactions.length === 0) {
        res.status(200).send({ message: 'No transaction found' });
      } else {
        res.status(200).send(transactions);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /transaction/:zip_code
  async getTransactionByZipcode(req, res) {
    try {
      const zip_code = req.params.zipcode;
      const transactions = await Transaction.findAll({
        where: { zip_code },
        attributes: { exclude: ['id'] }
      });
      if (transactions.length === 0) {
        res.status(200).send({ message: 'No transaction found with zip code = ' + zip_code });
      } else {
        res.status(200).send(transactions);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /transactions/:collection_zip_code
  async getTransactionByCollectionId(req, res) {
    try {
      const collection_zip_code = req.params.collection_zip_code;
      const transactions = await Transaction.findAll({
        where: { collection_zip_code },
        attributes: { exclude: ['id'] }
      });
      if (transactions.length === 0) {
        res.status(200).send({ message: 'No transaction found with collection zip code = ' + collection_zip_code });
      } else {
        res.status(200).send(transactions);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // [POST] /transactions
  async createTransaction(req, res) {
    try {
      const { name, collection_zip_code, admin_id, address } = req.body;
      if (!name || !collection_zip_code || !admin_id || !address) {
        res.status(400).send({ message: 'Missing required field(s)' });
      }

      await Transaction.create({
        name,
        collection_zip_code,
        admin_id,
        address,
      }).then((transaction) => {
        console.log(transaction);
        return res.status(201).json({
          msg: 'Transaction created successfully',
          transaction,
        });
      }).catch((error) => {
        console.log(error);
        return res.status(500).json({
          msg: 'Something went wrong',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

}

module.exports = new transactionController();
const {
  models: { Collection, Transaction },
} = require('../models/');

class collectionController {
  // [GET] /collections
  async getAllCollections(req, res) {
    try {
      const collections = await Collection.findAll({
        attributes: { exclude: ['id'] },
      });
      res.status(200).json({
        errorCode: 0,
        collections,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        msg: 'Server' + error.message,
      });
    }
  }

  // [GET] /collections/:zip_code
  async getCollectionByZipcode(req, res) {
    try {
      const zip_code = req.params.zip_code;
      const collections = await Collection.findAll({
        where: { zip_code },
        attributes: { exclude: ['id'] },
      });
      if (collections.length === 0) {
        return res.status(404).json({
          errorCode: 1,
          msg: 'Collection not found with this zip_code',
        });
      }
      res.status(200).json({
        errorCode: 0,
        collections,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        msg: 'Server' + error.message,
      });
    }
  }

  // [GET] /collections/:zip_code/transactions
  async getTransactionsByCollectionZipcode(req, res) {
    try {
      const zip_code = req.params.zip_code;
      const transactions = await Transaction.findAll({
        where: { collection_zip_code: zip_code },
        attributes: { exclude: ['id'] },
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

  // [POST] /collections
  async createCollection(req, res) {
    try {
      const { name, admin_id, address } = req.body;
      if (!name || !admin_id || !address) {
        res.status(400).json({
          errorCode: 1,
          msg: 'Missing required field(s)',
        });
      }
      await Collection.create({
        name,
        admin_id,
        address,
      });
      res.status(201).json({
        errorCode: 0,
        msg: 'New collection created successfully',
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
          msg: 'Invalid admin_id',
        });
      }
    }
  }

  // [PUT] /collections/:zip_code
  async updateCollection(req, res) {
    try {
      const zip_code = req.params.zip_code;
      const { name, admin_id, address } = req.body;
      if (!name || !admin_id || !address) {
        res.status(400).json({
          errorCode: 1,
          msg: 'Missing required field(s)',
        });
      }

      await Collection.update(
        {
          name,
          admin_id,
          address,
        },
        {
          where: { zip_code },
          returning: true, // to return the object
          plain: true, // return the object itself and not the other messy meta data that might not be useful.
        },
      )
        .then((collection) => {
          console.log(collection);
          return res.status(201).json({
            errorCode: 0,
            collection,
          });
        })
        .catch((error) => {
          console.log(error);
          // catch error from unique constraint
          res.status(400).json({
            errorCode: 1,
            msg: error.errors[0].message,
          });
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        msg: 'Server' + error.message,
      });
    }
  }

  // [DELETE] /collections/:zip_code
  async deleteCollection(req, res) {
    try {
      const zip_code = req.params.zip_code;
      const collection = await Collection.destroy({
        where: { zip_code },
      });
      if (collection === 0) {
        return res.status(404).json({
          errorCode: 1,
          msg: 'Collection not found with this zip_code',
        });
      }
      res.status(200).json({
        errorCode: 0,
        msg: 'Delete collection successfully',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errorCode: 1,
        msg: 'Server' + error.message,
      });
    }
  }
}

module.exports = new collectionController();

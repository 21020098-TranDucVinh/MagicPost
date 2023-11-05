const {
  models: { Collection },
} = require('../models/');

class collectionController {
  // [GET] /collections
  async getAllCollections(req, res) {
    try {
      const collections = await Collection.findAll({
        attributes: { exclude: ['id'] }
      });
      res.status(200).send(collections);
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /collections/:zip_code
  async getCollectionByZipcode(req, res) {
    try {
      const zip_code = req.params.zipcode;
      const collections = await Collection.findAll({
        where: { zip_code },
        attributes: { exclude: ['id'] }
      });
      res.status(200).send(collections);
    } catch (error) {
      console.log(error);
    }
  }

}

module.exports = new collectionController();
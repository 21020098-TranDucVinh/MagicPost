const Sequelize = require('sequelize');

// load .env file into process.env
require('dotenv').config();

const db = {};

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    define: {
      freezeTableName: true, // prevent sequelize from pluralizing table names
      noPrimaryKey: true,
    },
    // logging: false,
  },
);

db.sequelize = sequelize;
db.models = {};

db.models.Admin = require('./adminModel')(sequelize, Sequelize.DataTypes);
db.models.Collection = require('./collectionModel')(
  sequelize,
  Sequelize.DataTypes,
);
db.models.Transaction = require('./transactionModel')(
  sequelize,
  Sequelize.DataTypes,
);
db.models.Staff = require('./staffModel')(sequelize, Sequelize.DataTypes);
db.models.Parcels = require('./parcelsModel')(sequelize, Sequelize.DataTypes);
db.models.Tracking = require('./trackingModel')(sequelize, Sequelize.DataTypes);

Object.keys(db.models).forEach((modelName) => {
  if (db.models[modelName].associate) {
    db.models[modelName].associate(db.models);
  }
});

async function testConnect() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database successful!');
  } catch (error) {
    console.error(error);
  }
}

testConnect();

module.exports = db;

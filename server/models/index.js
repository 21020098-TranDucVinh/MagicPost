const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const db = {};

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    define: {
      freezeTableName: true,
      noPrimaryKey: true,
    },
    logging: console.log,
  },
);

db.sequelize = sequelize;
db.models = {};

db.models.Admin = require('./adminModel')(sequelize, Sequelize.DataTypes);

Object.keys(db.models).forEach((modelName) => {
  if (db.models[modelName].associate) {
    db.models[modelName].associate(db.models);
  }
});

module.exports = db;
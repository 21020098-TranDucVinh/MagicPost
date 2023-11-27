const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Collection, {
        foreignKey: 'collection_zip_code',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      Transaction.belongsTo(models.Admin, {
        foreignKey: 'admin_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      Transaction.hasMany(models.Staff, {
        foreignKey: 'transaction_zip_code',
      });
    }
  }

  Transaction.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      zip_code: {
        type: DataTypes.STRING,
        allowNull: true, // zip_code is auto insert by trigger
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      collection_zip_code: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: 'collection',
          key: 'zip_code',
        },
      },
      admin_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'admin',
          key: 'id',
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize, // We need to pass the connection instance
      modelName: 'transaction', // We need to choose the model name
      timestamps: false, // Don't add the timestamp attributes (updatedAt, createdAt)
    },
  );
  return Transaction;
};

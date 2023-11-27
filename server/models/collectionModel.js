const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    static associate(models) {
      // define association here
      Collection.belongsTo(models.Admin, {
        foreignKey: 'admin_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      Collection.hasMany(models.Transaction, {
        foreignKey: 'collection_zip_code',
      });
      Collection.hasMany(models.Staff, {
        foreignKey: 'collection_zip_code',
      });
    }
  }

  Collection.init(
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
      admin_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'admin',
          key: 'id',
        },
        unique: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize, // We need to pass the connection instance
      modelName: 'collection', // We need to choose the model name
      timestamps: false, // Don't add the timestamp attributes (updatedAt, createdAt)
    },
  );
  return Collection;
};

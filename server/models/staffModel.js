const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    static associate(models) {
      // define association here
      Staff.belongsTo(models.Collection, {
        foreignKey: 'collection_zip_code',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      Staff.belongsTo(models.Transaction, {
        foreignKey: 'transaction_zip_code',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
  }

  Staff.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      staff_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      collection_zip_code: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: 'collection',
          key: 'zip_code',
        },
      },
      transaction_zip_code: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: 'transaction',
          key: 'zip_code',
        },
      },
    },
    {
      sequelize, // We need to pass the connection instance
      modelName: 'staff', // We need to choose the model name
      timestamps: false, // Don't add the timestamp attributes (updatedAt, createdAt)
    },
  );
  return Staff;
};

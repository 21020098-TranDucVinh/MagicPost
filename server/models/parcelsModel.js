const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Parcels extends Model {
    static associate(models) {
      // define association here
      Parcels.hasMany(models.Tracking, { foreignKey: 'parcel_id' });
    }
  }

  Parcels.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      parcel_id: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      status: {
        type: DataTypes.ENUM(
          'PENDING',
          'SHIPPING',
          'DELIVERING',
          'DELIVERED',
          'RETURNED',
        ),
        allowNull: false,
        defaultValue: 'PENDING',
      },
      s_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      s_phone: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      s_address: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      s_time: {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      r_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      r_phone: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      r_address: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      r_time: {
        type: 'TIMESTAMP',
        allowNull: true,
      },
      type: {
        type: DataTypes.ENUM('DOCUMENT', 'PACKAGE'),
        allowNull: false,
        defaultValue: 'PACKAGE',
      },
      weight: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      s_zip_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      r_zip_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cost: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      r_cod: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: { cod: 0, bonus: 0 },
      },
      last_shipper_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      last_shipper_phone: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
    },
    {
      sequelize, // We need to pass the connection instance
      modelName: 'parcels', // We need to choose the model name
      timestamps: false, // Don't add the timestamp attributes (updatedAt, createdAt)
    },
  );
  return Parcels;
};

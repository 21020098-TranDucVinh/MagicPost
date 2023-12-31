const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tracking extends Model {
    static associate(models) {
      // define association here
      Tracking.belongsTo(models.Parcels, {
        foreignKey: 'parcel_id',
        targetKey: 'parcel_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
  }

  Tracking.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      s_staff_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      s_zip_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      s_time: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      r_zip_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parcel_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: 'parcels',
          key: 'parcel_id',
        },
      },
      status: {
        type: DataTypes.ENUM('DELIVERING', 'DELIVERED', 'RETURNED', 'DONE'),
        allowNull: false,
        defaultValue: 'DELIVERING',
      },
      last_update: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      last_staff_id_update: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      shipper_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      shipper_phone: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
    },
    {
      sequelize, // We need to pass the connection instance
      modelName: 'tracking', // We need to choose the model name
      timestamps: false, // Don't add the timestamp attributes (updatedAt, createdAt)
    },
  );
  return Tracking;
};

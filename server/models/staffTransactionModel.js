const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StaffTransaction extends Model {
    static associate(models) {
      // define association here
      StaffTransaction.belongsTo(models.Staff, {
        foreignKey: 'r_staff_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });    }
  };

  StaffTransaction.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    from_collection: {
      type: DataTypes.JSON,
      allowNull: false,
      unique: true
    },
    r_staff_id: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'staff',
        key: 'staff_id'
      }
    }
  }, {
    sequelize, // We need to pass the connection instance
    modelName: 'stafftransaction', // We need to choose the model name
    timestamps: false // Don't add the timestamp attributes (updatedAt, createdAt)
  });
  return StaffTransaction;
}
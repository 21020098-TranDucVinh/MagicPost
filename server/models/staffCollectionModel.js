const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StaffCollection extends Model {
    static associate(models) {
      // define association here
     // StaffCollection.hasMany(models.Parcels, { foreignKey: 'staff_collection_id' });
    }
  };

  StaffCollection.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    from_collection: {
      type: DataTypes.JSON,
      allowNull: true,
      unique: true
    }
  }, {
    sequelize, // We need to pass the connection instance
    modelName: 'staffcollection', // We need to choose the model name
    timestamps: false // Don't add the timestamp attributes (updatedAt, createdAt)
  });
  return StaffCollection;
}
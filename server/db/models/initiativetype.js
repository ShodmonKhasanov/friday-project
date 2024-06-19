'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InitiativeType extends Model {
    static associate(models) {
      InitiativeType.hasMany(models.Initiative, { foreignKey: 'initiativeTypeId' });
    }
  }
  InitiativeType.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'InitiativeType',
  });
  return InitiativeType;
};

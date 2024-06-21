'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InitLevel extends Model {
    static associate(models) {
      InitLevel.hasMany(models.Initiative, { foreignKey: 'initLevelId' });
    }
  }
  InitLevel.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'InitLevel',
    },
  );
  return InitLevel;
};

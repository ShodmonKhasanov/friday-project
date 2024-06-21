'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Initiative extends Model {
    static associate(models) {
      Initiative.belongsTo(models.User, { foreignKey: 'userId' });
      Initiative.belongsTo(models.InitiativeType, { foreignKey: 'initiativeTypeId' });
      Initiative.belongsTo(models.InitLevel, { foreignKey: 'initLevelId' });
    }
  }
  Initiative.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      votesCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      percentFor: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      initiativeTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'InitiativeTypes', // Исправлено на InitiativeTypes
          key: 'id',
        },
      },
      initLevelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'InitLevels', // Исправлено на InitLevels
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Initiative',
    },
  );
  return Initiative;
};

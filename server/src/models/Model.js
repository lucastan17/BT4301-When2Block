const { Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Model', {
    // attributes and data types etc
    model_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    editedTime: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
      primaryKey: true
    },
    modelName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    modelVersion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    modelDescription: {
      type: DataTypes.STRING,
      allowNull: false
    },
    inProduction: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: 'Model'
  }
  )
  return Model
}

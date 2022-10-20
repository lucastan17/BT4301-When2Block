module.exports = (sequelize, DataTypes) => {
  const Drift = sequelize.define('Drift', {
    // attributes and data types etc
    model_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    time: {
      type: DataTypes.DATE,
      primaryKey: true
    },
    accuracy: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    precision: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    recall: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    f1_score: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    auc: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: 'Drift'
  }
  )
  return Drift
}

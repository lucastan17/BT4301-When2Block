module.exports = (sequelize, DataTypes) => {
  const Results = sequelize.define('Results', {
    // attributes and data types etc
    model_id: {
      type: DataTypes.INTEGER,
      // autoIncrement: true,
      primaryKey: true
    },
    location: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    time: {
      type: DataTypes.DATE,
      primaryKey: true
    },
    weather: {
      type: DataTypes.STRING,
      allowNull: false
    },
    uv_index: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    prediction: {
      type: DataTypes.STRING,
      allowNull: false
    },
    actual: {
      type: DataTypes.STRING,
      allowNull: false
    },
    predict_proba: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },

  { timestamps: false }
  )
  return Results
}

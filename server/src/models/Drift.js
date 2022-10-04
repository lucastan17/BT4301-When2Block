module.exports = (sequelize, DataTypes) => {
    const Drift = sequelize.define('Drift', {
      //attributes and data types etc
      model_id: {
        type: DataTypes.INTEGER,
        //autoIncrement: true,
        primaryKey: true
      },
      time: {
        type: DataTypes.DATETIME,
        defaultValue: DataTypes.NOW,
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
    })}
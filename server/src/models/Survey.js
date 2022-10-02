module.exports = (sequelize, DataTypes) => {
    const Survey = sequelize.define('Survey', {
      //attributes and data types etc
      survey_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      sunscreen_freq: {
        type: DataTypes.STRING,
        allowNull: false
      },
      skin_type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      created_date: {
        type: DataTypes.DATETIME,
        defaultValue: DataTypes.NOW,
        allowNull: false
      }
    })}
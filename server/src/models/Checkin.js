module.exports = (sequelize, DataTypes) => {
    const Checkin = sequelize.define('Checkin', {
      //attributes and data types etc
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      created_date: {
        type: DataTypes.DATETIME,
        defaultValue: DataTypes.NOW,
        primaryKey: true
      }
    })
    return Checkin
  }
module.exports = (sequelize, DataTypes) => {
  const Checkin = sequelize.define('Checkin', {
    // attributes and data types etc
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  })
  return Checkin
}

module.exports = (sequelize, DataTypes) => {
  const Checkin = sequelize.define('Checkin', {
    // attributes and data types etc
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    checkin_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: 'Check_in'
  }
  )

  Checkin.associate = function (models) {
    // can add User.hasMany(Checkin)
  }
  return Checkin
}

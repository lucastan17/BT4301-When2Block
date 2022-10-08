module.exports = (sequelize, DataTypes) => {
  const Survey = sequelize.define('Survey', {
    // attributes and data types etc
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
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  })

  Survey.associate = function (models) {
    // can add User.hasMany(Survey)
  }

  return Survey
}

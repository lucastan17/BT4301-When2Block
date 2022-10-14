const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt'))
const saltRounds = 10

async function hashPassword (user, options) {
  if (!user.changed('password')) {
    return
  }

  return await bcrypt
    .hash(user.password, saltRounds)
    .then(hash => {
      console.log(`Hash: ${hash}`)
      user.setDataValue('password', hash)
    })
    .catch(err => console.error(err.message))
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    // attributes and data types etc
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin_user: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  },
  {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
      // beforeSave: hashPassword
    }
  })

  User.prototype.comparePassword = async function (password) {
    const val = await bcrypt.compare(password, this.password)
    return val
  }

  User.associate = function (models) {
  }

  return User
}

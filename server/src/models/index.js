// const fs = require('fs')
// const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  // config.db.options,
  {
    host: config.db.host,
    dialect: 'mysql'
  }
)

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.')
}).catch((error) => {
  console.error('Unable to connect to the database: ', error)
})

db.users = require('./User')(sequelize, Sequelize)
db.survey = require('./Survey')(sequelize, Sequelize)
db.checkin = require('./Checkin')(sequelize, Sequelize)
db.drift = require('./Drift')(sequelize, Sequelize)
db.results = require('./Results')(sequelize, Sequelize)
db.model = require('./Model')(sequelize, Sequelize)

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db

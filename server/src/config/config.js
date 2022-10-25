// const path = require('path')

module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    dialect: 'mysql',
    host: process.env.DB_HOST
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}

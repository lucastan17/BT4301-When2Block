// const path = require('path')

module.exports = {
  port: 8081,
  db: {
    host: 'database',
    user: 'when2block',
    password: 'bt4301grp2',
    database: 'when2block',
    dialect: 'mysql'
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}

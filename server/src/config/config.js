
const path = require('path')

module.exports = {
  port: process.env.PORT || 3307,
  db: {
     database: process.env.DB_NAME || 'when2block',
     user: process.env.DB_USER || 'when2block',
     password: process.env.DB_PASS || 'zAHk2seIiR.tW055',
     options: {
       dialect: process.env.DIALECT || 'mysql',
       host: process.env.HOST || 'localhost'
     }
   },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
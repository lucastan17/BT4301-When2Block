// const path = require('path')

module.exports = {
  port: 8081,
  db: {
    /* database: process.env.DB_NAME || 'when2block',
        user: process.env.DB_USER || 'when2block',
        password: process.env.DB_PASS || 'bt4301grp2',
        options: {
          dialect: process.env.DIALECT || 'mysql',
          host: process.env.HOST || 'localhost' */
    // }
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'when2block',
    dialect: 'mysql',
    options: {
      dialect: 'mysql',
      host: 'localhost'
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}

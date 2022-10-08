const db = require('../models')
// const jwt = require('jsonwebtoken')
// const config = require('../config/config')

/*
function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}
*/

module.exports = {
  async register (req, res) {
    try {
      // logic to send to db
      const user = await db.users.create(req.body)
      res.send(user.toJSON())
      // need email, pw
    } catch (err) {
      // error handling
      // prevent registering and sending of info to db cos ID autoincrements
      // can popup and prevent routing to next page i.e. survey
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  },
  async login (req, res) {
    try {
      // logic to authenticate, get jwt and update app state
      // need email, pw
    } catch (err) {
      // error handling
    }
  }
}

const db = require('../models')
const User = db.users
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      // logic to send to db
      const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        admin_user: req.body.email === 'admin123@gmail.com' ? 1 : 0
      })
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      // error handling
      // prevent registering and sending of info to db cos ID autoincrements
      // can popup and prevent routing to next page i.e. survey
      res.status(400).send({
        error: err.message || 'An error has ocurred.'
      })
    }
  },
  async login (req, res) {
    try {
      // logic to authenticate, get jwt and update app state
      // need email, pw
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email
        }
      })
      if (!user) {
        return res.status(403).send({
          error: 'The login information is incorrect.'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      console.log('here ' + isPasswordValid)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information is incorrect.'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      // error handling
      res.status(400).send({
        error: err.message || 'An error has occurred trying to log in.'
      })
    }
  }
}

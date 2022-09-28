//const {User} = require('../models')
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
      //logic to send to db
      //need email, pw
    } catch (err) {
      //error handling
    }
  },
  async login (req, res) {
    try {
      //logic to authenticate, get jwt and update app state
      //need email, pw
    } catch (err) {
      //error handling
    }
  }
}
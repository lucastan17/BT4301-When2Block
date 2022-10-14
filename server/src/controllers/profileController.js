const db = require('../models')
const User = db.users

module.exports = {
  async index (req, res) {
    try {
      // logic to retrive profile details from db
      const { email } = req.body
      const user = await User.findOne({
        where: {
          email
        }
      })
      if (!user) {
        return res.status(403).send({
          error: 'User does not exist.'
        })
      }
      const userJson = user.toJSON()
      res.send({
        user: userJson
      })

      // need user id
    } catch (err) {
      // error handling
      res.status(400).send({
        error: err.message || 'An error has occurred trying to find user.'
      })
    }
  },
  async post (req, res) {
    try {
      // update profile details
      // need userid and wtv needs to be updated
      // note!! hash password before storing
      const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
      res.send(user.toJSON())
    } catch (err) {
      // error handling
    }
  }
}

const db = require('../models')
const User = db.users

module.exports = {
  async changepw (req, res) {
    try {
      // logic to retrive profile details from db
      const { email, password } = req.body
      await User.update(
        { password },
        { where: { email } }
      )
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
        error: err.message || 'An error has occurred trying to change pw.'
      })
    }
  },
  async profile (req, res) {
    try {
      // logic to retrive profile details from db
      const { username, id, email } = req.body
      await User.update(
        { username, email },
        { where: { user_id: id } }
      )
      const user = await User.findOne({
        where: {
          user_id: id
        }
      })
      if (!user) {
        return res.status(403).send({
          error: 'The login information is incorrect.'
        })
      }
      const userJson = user.toJSON()
      res.send({
        user: userJson
      })
    } catch (err) {
      // error handling
      res.status(400).send({
        error: err.message || 'An error has occurred trying to update user.'
      })
    }
  }
}

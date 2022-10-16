const db = require('../models')
const User = db.users

module.exports = {
  async changepw (req, res) {
    try {
      // logic to retrive profile details from db
      const { email, password } = req.body
      const user = await User.update(
        { password },
        { where: { email } }
      )
      if (!user) {
        return res.status(403).send({
          error: 'User does not exist.'
        })
      }

      // need user id
    } catch (err) {
      // error handling
      res.status(400).send({
        error: err.message || 'An error has occurred trying to find user.'
      })
    }
  },
  async profile (req, res) {
    try {
      // logic to retrive profile details from db
      const { username, id, email } = req.body
      await User.upsert(
        { user_id: id, username, email }
      )
    } catch (err) {
      // error handling
      res.status(400).send({
        error: err.message || 'An error has occurred trying to update user.'
      })
    }
  }
}

const db = require('../models')
const Survey = db.survey

module.exports = {
  async post (req, res) {
    try {
      const survey = await Survey.create({
        // TO DO: user id from state
        user_id: req.body.user_id,
        sunscreen_freq: req.body.sunscreen_freq,
        skin_type: req.body.skin_type

      })
      res.send(survey.toJSON())
    } catch (err) {
      res.status(400).send({
        error: err.message || 'An error has ocurred.'
      })
    }
  }
}

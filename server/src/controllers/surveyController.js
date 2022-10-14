const db = require('../models')
const Survey = db.survey

module.exports = {
  async post (req, res) {
    try {
      // send survey details to db
      // need user id and survey details
      const survey = await Survey.create({
        user_id: req.body.user_id,
        sunscreen_freq: req.body.sunscreen_freq,
        skin_type: req.body.skin_type
      })
      res.send(survey.toJSON())
    } catch (err) {
      // error handling
      res.status(400).send({
        error: err.message || 'An error has ocurred.'
      })
    }
  }
}

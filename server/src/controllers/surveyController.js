const db = require('../models')
const sequelize = db.sequelize
const { QueryTypes } = require('sequelize')
const Survey = db.survey

module.exports = {
  async post (req, res) {
    try {
      // send survey details to db
      // need user id and survey details

      let id = req.body.user_id 
      let myquery = "SELECT MAX(survey_id) as id FROM `Surveys` WHERE user_id = " + String(id) + ";"
      let survey_id_db = await sequelize.query(myquery, { type: QueryTypes.SELECT })
      let final_id = 1;
      if (survey_id_db != null) {
        final_id = survey_id_db[0].id
      }

      const survey = await Survey.create({
        survey_id: final_id,
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
  },
  async answer (req, res) {
    try {
      const answer = await Survey.findOne({
        where: {
          user_id: req.body.user_id
        },
        order: [['createdAt', 'DESC']]
      })
      console.log(answer)
      const answerJSON = answer.toJSON()
      res.send({
        answer: answerJSON
      })
    } catch (err) {
      // error handling
      res.status(400).send({
        error: err.message || 'An error has occurred trying to get survey result.'
      })
    }
  }
}

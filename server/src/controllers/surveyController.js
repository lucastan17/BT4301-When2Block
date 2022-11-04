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
      let surveyIdDb = await sequelize.query(myquery, { type: QueryTypes.SELECT })
      let finalId = 1;
      if (surveyIdDb != null) {
        final_id = surveyIdDb[0].id + 1
      }

      const survey = await Survey.create({
        survey_id: finalId,
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

const db = require('../models')
const sequelize = db.sequelize
const QueryTypes = require('sequelize')
const Results = db.results

module.exports = {
  async index (req, res) {
    const result = {}
    try {
      const hours = await sequelize.query('SELECT distinct(hour(time)) as hr FROM when2block.Results WHERE cast(results.time as date) >= cast(Date(Now()) as date) and hour(results.time) > hour(Now())', { type: QueryTypes.SELECT })
      result.hours = hours

      const pred = await sequelize.query('SELECT * FROM when2block.Results WHERE cast(results.time as date) >= cast(Date(Now()) as date) and hour(results.time) > hour(Date(Now()))', { type: QueryTypes.SELECT })
      result.pred = pred

      const tf = require('@tensorflow/tfjs')
      const tfn = require('@tensorflow/tfjs-node')
      const handler = tfn.io.fileSystem('./public/uvi-model/UVImodel.json')
      const UVImodel = await tf.loadLayersModel(handler)
      console.log('backend loaded', UVImodel)

      res.send(result)
    } catch (err) {
      // error handling
      result.err = err.error
      res.send(result)
    }
  },
  async post (req, res) {
    try {
      // send search details to db
      const posRes = await Results.create({
        model_id: req.body.model_id,
        location: req.body.location,
        time: req.body.time,
        weather: req.body.weather,
        uv_index: req.body.uv_index,
        prediction: req.body.prediction,
        actual: req.body.actual,
        predict_proba: req.body.predict_proba
      })
      res.send(posRes.toJSON())
    } catch (err) {
      // error handling
      res.status(400).send({
        error: err.message || 'An error has ocurred.'
      })
    }
  }
}

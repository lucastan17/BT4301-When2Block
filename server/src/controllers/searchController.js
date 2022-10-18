const db = require('../models')
const sequelize = db.sequelize
const { QueryTypes, Op } = require('sequelize')
const Results = db.results

module.exports = {
  async index (req, res) {
    const result = {}
    try {
      const all = await sequelize.query('SELECT * FROM results', { type: QueryTypes.SELECT })
      result.all = all
      // logic to retrieve from db
      // need location and time
      const currDate = await sequelize.query('SELECT cast(Results.time as date) date FROM Results WHERE Results.location ="test"', { type: QueryTypes.SELECT })
      result.currDate = currDate

      const UVI = await sequelize.query('SELECT * FROM Results WHERE cast(Results.time as date) >= cast(Date(Now()) as date)', { type: QueryTypes.SELECT })
      result.UVI = UVI

      const handler1 = tfn.io.fileSystem(process.cwd() + '/src/production_models/model_1/UVImodel.json')
      result.handler1 = handler1

      const UVImodel = await tf.loadLayersModel(handler1)
      // const locStor = await UVImodel.save('http://localhost:8081/search#UVImodel')
      result.UVImodel = UVImodel

      const handler2 = tfn.io.fileSystem(process.cwd() + '/src/production_models/model_2/model.json')
      result.handler2 = handler2

      const model = await tf.loadLayersModel(handler2)
      result.model = model

      const inputTensor = tf.tensor2d([[1, 2], [0, 3], [1, 1], [0, 4]])
      result.inputTensor = inputTensor

      const predResult = await model.predict(inputTensor)
      result.predResult = predResult

      const predResultout = predResult.dataSync()
      result.pred = predResultout

      form.append('UV_model', UVImodel)

      const timeModel = await Results.findAll({
        where: {
          time: {
            [Op.gte]: new Date(Date.now() + 8 * (3600 * 1000)) // 8hours ahead is SG timezone
            // [Op.lte]: new Date(new Date() + 12 * 60 * 60 * 1000)
          }
        }
      })
      // const timeModel = await sequelize.query('SELECT * FROM results WHERE results.time > FORMAT(Date(NOW(), '%Y-%m-%d %H:00:00' )))
      result.timeModel = timeModel

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

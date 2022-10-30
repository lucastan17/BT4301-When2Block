const db = require('../models')
const sequelize = db.sequelize
const { QueryTypes } = require('sequelize')
const Results = db.results
const Model = db.model
const tf = require('@tensorflow/tfjs')
const tfn = require('@tensorflow/tfjs-node')
const fetch = require('node-fetch')
// const { results } = require('../models')
const uviUrl = 'https://api.data.gov.sg/v1/environment/uv-index?date='
const sunnyConditions = ['Cloudy', 'Fair & Warm', 'Fair (Day)', 'Partly Cloudy(Day)', 'Windy']

module.exports = {
  async index (req, res) {
    const result = {}
    try {
      const hours = await sequelize.query('SELECT distinct(hour(time)) as hr FROM when2block.Results WHERE cast(Results.time as date) >= cast(Date(Now()) as date) and hour(Results.time) > hour(Now())', { type: QueryTypes.SELECT })
      result.hours = hours

      const pred = await sequelize.query('SELECT * FROM when2block.Results WHERE cast(Results.time as date) >= cast(Date(Now()) as date) and hour(Results.time) > hour(Date(Now()))', { type: QueryTypes.SELECT })
      result.pred = pred

      const modeld = await Model.findOne({
        where: {
          inProduction: 1
        }
      })

      const handler1 = tfn.io.fileSystem(process.cwd() + '/src/production_models/uvi_model_1/UVImodel.json')
      const UVImodel = await tf.loadLayersModel(handler1)

      const handler2 = tfn.io.fileSystem(process.cwd() + '/src/production_models/model_' + String(modeld.model_id) + '/model.json')
      const predModel = await tf.loadLayersModel(handler2)

      // Vinod's code here
      const result1 = await UVImodel.save(tf.io.withSaveHandler(async modelArtifacts => modelArtifacts))
      result1.weightData = Buffer.from(result1.weightData).toString('base64')
      const jsonStr = JSON.stringify(result1)
      result.UVmod = jsonStr

      const result2 = await predModel.save(tf.io.withSaveHandler(async modelArtifacts => modelArtifacts))
      result2.weightData = Buffer.from(result2.weightData).toString('base64')
      const jsonStr2 = JSON.stringify(result2)
      result.mod = jsonStr2
      //

      // result.UVId = UVId
      result.modeld = modeld

      // const handler1 = tfn.io.fileSystem(process.cwd() + '/src/production_models/uvi_model_1/model.json')
      // const UVImodel = await tf.loadLayersModel(handler1)

      // const handler2 = tfn.io.fileSystem(process.cwd() + '/src/production_models/pred_model_1/model.json')
      // const predModel = await tf.loadLayersModel(handler2)

      // Get model_id of deployed

      // predict from backend

      // predict UVI
      // load yesterday UVI
      const today = new Date()
      const previous = new Date(today.getTime())
      previous.setDate(today.getDate() - 1)
      result.prev = previous

      const urlerror = this.formatDate(previous)
      result.urlerror = urlerror

      const uviDataObj = await fetch(uviUrl + this.formatDate(previous))
      const uviDataList = uviDataObj.data.items[12].index
      result.uviurl = uviDataList
      // transform uvi data into a tensor
      const uviTensor = this.uviTransform(uviDataList)
      const uviResult = await UVImodel.predict(uviTensor)
      const uviResultout = uviResult.dataSync()
      const uviPred = uviResultout[0]

      // weather pred
      const weatherDataObj = await fetch('https://api.data.gov.sg/v1/environment/2-hour-weather-forecast')
      const weatherPred = weatherDataObj.data.items[0].forecasts
      result.weatherpred = weatherPred

      // transform into numerical input
      const weatherItems = []
      for (let i = 0; i < weatherPred.length; i++) {
        let condition = weatherPred.forecast
        if (sunnyConditions.includes(condition)) {
          condition = 1
        } else {
          condition = 0
        }
        weatherItems.push([condition, uviPred])
      }
      result.weatherItems = weatherItems

      // transform weather and uvi data into a tensor
      const inputTensor = tf.tensor2d(weatherItems)
      result.inputTensor = inputTensor

      const predResult = await predModel.predict(inputTensor)
      result.predResult = predResult

      const predResultout = predResult.dataSync()
      result.predOut = predResultout

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
      let newId = 0
      const index = await sequelize.query('SELECT MAX(model_id) as id FROM Model;', { type: QueryTypes.SELECT })
      if (index != null) {
        newId = index[0].id
      }
      const posRes = await Results.create({
        model_id: newId,
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
  },
  async formatDate (dt) {
    const day = dt.getDate()
    const month = dt.getMonth() + 1
    const year = dt.getFullYear()
    return `${year}-${month}-${(day > 9 ? '' : '0') + day}`
  },
  uviTransform (data) {
    const input = []
    for (let i = 0; i < data.length; i++) {
      const value = [data[i].value]
      input.push(value)
    }
    const inputTensor = tf.tensor3d([input])
    return inputTensor
  }
}

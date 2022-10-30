const { QueryTypes } = require('sequelize')
const db = require('../models')
const sequelize = db.sequelize
const tf = require('@tensorflow/tfjs')
const tfn = require('@tensorflow/tfjs-node')
const fetch = require('node-fetch')
const uviUrl = 'https://api.data.gov.sg/v1/environment/uv-index?date='
const sunnyConditions = ['Cloudy', 'Fair & Warm', 'Fair (Day)', 'Partly Cloudy(Day)', 'Windy']
const Results = db.results // to add directly to DB
const Drift = db.drift // to add directly to DB

module.exports = {
  async index (req, res) {
    try {
      // logic to retrive model details from db
      // need model id and time
      const models = await sequelize.query(`SELECT m.model_id, modelName, inProduction, modelDescription, modelVersion, time as editedTime, accuracy
                                        FROM Model m JOIN Drift d ON m.model_id=d.model_id 
                                        WHERE time IN (SELECT MAX(time) FROM Drift 
                                        WHERE model_id IN (SELECT model_id FROM Model) 
                                        GROUP BY model_id)
                                        ORDER BY m.model_id;`, { type: QueryTypes.SELECT })
      const modelDetails = {}

      const additionalModels = await sequelize.query('SELECT model_id, modelName, inProduction, modelDescription, modelVersion, editedTime, "not tested" as accuracy FROM Model;', { type: QueryTypes.SELECT })
      const modelList = []
      for (let i = 0; i < models.length; i++) {
        modelList.push(models[i].model_id)
      }
      const additionalModelsToAdd = []
      for (let j = 0; j < additionalModels.length; j++) {
        if (modelList.includes(additionalModels[j].model_id)) {
          console.log('placeholder to be deleted')
        } else {
          additionalModelsToAdd.push(additionalModels[j])
        }
      }
      models.push(...additionalModelsToAdd)
      models.reverse()
      modelDetails.models = models
      res.send(modelDetails)
    } catch (err) {
      // error handling
      // res.send('ERROR' + err)
    }
  },
  async post (req, res) {
    try {
      // send new model details
      // need model details and time
      const { id } = req.params
      await sequelize.transaction(async (transaction) => {
        const currInProduction = await db.model.findOne({
          where: {
            inProduction: 1
          }
        }, { transaction })
        if (currInProduction && currInProduction.model_id === id) {
          res.status(200).send('Already In Use')
          return
        }
        await db.model.update({
          inProduction: 0
        }, {
          where: {
            model_id: currInProduction.model_id
          }
        }, { transaction })
        await db.model.update({
          inProduction: 1
        }, {
          where: {
            model_id: id
          }
        }, { transaction })
      })
      res.status(200).send('Model Deployment Updated')
    } catch (err) {
      // error handling
      res.status(400).send({
        error: err.message || 'An error has ocurred.'
      })
    }
  },
  async refresh (req, res) {
    try {
      var { id } = req.params
      
      if (id === -1) {
        const index = await sequelize.query('SELECT model_id as cid FROM Model where inProduction = 1', { type: QueryTypes.SELECT })
        id = index[0].cid
      }

      const test = {}
      test.id = id

      // load correct model
      const handler1 = tfn.io.fileSystem(process.cwd() + '/src/production_models/uvi_model_1/UVImodel.json')
      const UVImodel = await tf.loadLayersModel(handler1)

      const handler2 = tfn.io.fileSystem(process.cwd() + '/src/production_models/model_' + String(id) + '/model.json')
      const predModel = await tf.loadLayersModel(handler2)

      // load yesterday UVI
      const today = new Date()
      const previous = new Date(today.getTime())
      previous.setDate(today.getDate() - 1)

      const day = previous.getDate()
      const month = previous.getMonth() + 1
      const year = previous.getFullYear()
      const val = `${year}-${month}-${(day > 9 ? '' : '0') + day}`
      test.daterval = val

      const url = uviUrl + val

      const uviDataObj = await fetch(url)

      const d = await uviDataObj.json()
      test.d = d
      const lastIndex = d.items.length - 1
      test.lastIndex = lastIndex

      const uviDataList = d.items[lastIndex].index
      test.uviDataList = uviDataList

      // tesnfrom uvidata to 3d tensor
      const input = []
      for (let i = 0; i < uviDataList.length; i++) {
        const value = [uviDataList[i].value]
        input.push(value)
      }
      const uviTensor = tf.tensor3d([input])
      test.uviTensor = uviTensor

      const uviResult = await UVImodel.predict(uviTensor)
      const uviResultout = uviResult.dataSync()
      const uviPred = uviResultout[0]
      test.uviPred = uviPred

      // // weather pred
      const weatherDataObj = await fetch('https://api.data.gov.sg/v1/environment/2-hour-weather-forecast')
      const forecasts = await weatherDataObj.json()
      const weatherPred = forecasts.items[0].forecasts
      test.weatherPred = weatherPred

      // transform into numerical input
      const weatherItems = []
      for (let i = 0; i < weatherPred.length; i++) {
        let condition = weatherPred[i].forecast
        if (sunnyConditions.includes(condition)) {
          condition = 1
        } else {
          condition = 0
        }
        weatherItems.push([condition, uviPred])
      }
      test.weatherItems = weatherItems

      // // transform weather and uvi data into a tensor
      const inputTensor = tf.tensor2d(weatherItems)
      test.inputTensor = inputTensor

      let predResult = await predModel.predict(inputTensor)
      predResult = predResult.dataSync()
      test.predResult = predResult

      // actual results
      const actualData = []
      for (let i = 0; i < weatherPred.length; i++) {
        let condition = weatherPred[i].forecast
        if (sunnyConditions.includes(condition)) {
          condition = 1
        } else {
          condition = 0
        }
        if (condition === 1 && uviPred < 3) {
          actualData.push(1)
        } else {
          actualData.push(0)
        }
      }

      const locations = ['Ang Mo Kio', 'Bedok', 'Bishan', 'Boon Lay', 'Bukit Batok', 'Bukit Merah', 'Bukit Panjang',
        'Bukit Timah', 'Central Water Catchment', 'Changi', 'Choa Chu Kang', 'Clementi', 'City', 'Geylang', 'Hougang', 'Jalan Bahar',
        'Jurong East', 'Jurong Island', 'Jurong West', 'Kallang', 'Lim Chu Kang', 'Mandai', 'Marine Parade', 'Novena', 'Pasir Ris',
        'Paya Lebar', 'Pioneer', 'Pulau Tekong', 'Pulau Ubin', 'Punggol', 'Queenstown', 'Seletar', 'Sembawang', 'Sengkang',
        'Sentosa', 'Serangoon', 'Southern Islands', 'Sungei Kadut', 'Tampines', 'Tanglin', 'Tengah', 'Toa Payoh', 'Tuas', 'Western Islands',
        'Western Water Catchment', 'Woodlands', 'Yishun']

      // Create results in DB
      const itemPairs = []

      for (let i = 0; i < 47; i++) {
        const name = locations[i]

        const ts = new Date(new Date().getTime() + (8 + 0) * (3600 * 1000))
        await Results.create({
          model_id: id,
          location: name,
          time: ts,
          weather: weatherPred[i].forecast,
          uv_index: Math.ceil(uviPred),
          prediction: ((predResult[i] < 0.5) ? 0 : 1),
          actual: actualData[i],
          predict_proba: predResult[i]
        })
        itemPairs.push({ prediction: ((predResult[i] < 0.5) ? 0 : 1), actual: actualData[i] })
      }

      // Calculate results in Drift table
      let tp = 0; let tn = 0; let fn = 0; let fp = 0
      itemPairs.forEach(confusion)
      function confusion (item) {
        if (item.prediction === item.actual && item.actual) {
          tp += 1
        } else if (item.prediction === item.actual && !item.actual) {
          tn += 1
        } else if (item.prediction !== item.actual && item.actual) {
          fn += 1
        } else {
          fp += 1
        }
      }

      let acc = (tp + tn) / (tp + tn + fp + fn)
      let pre = tp / (tp + fp)
      let rec = tp / (tp + fn)
      let f1 = 2 * pre * rec / (pre + rec)
      let chi = (fp - fn) ** 2 / (tp + fn) + (fn - fp) ** 2 / (tn + fp)

      // prevent_ null
      if (acc === null) {
        acc = 0 
      }
      if (pre === null) {
        pre = 0
      } 
      if (rec === null) {
        rec = 0 
      }
      if (f1 === null) {
        f1 = 0
      } 
      if (chi === null) {
        chi = 0 
      }

      const ts = new Date(new Date().getTime() + (8 + 0) * (3600 * 1000))

      await Drift.create({
        model_id: id,
        time: ts,
        accuracy: acc,
        precision: pre,
        recall: rec,
        f1_score: f1,
        chi_square: chi
      })
      res.send(test)
    } catch (err) {
      res.status(400).send(err.message)
    }
  }
}

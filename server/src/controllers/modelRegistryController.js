const { QueryTypes } = require('sequelize')
const db = require('../models')
const sequelize = db.sequelize
// const tf = require('@tensorflow/tfjs')
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
      const models = await sequelize.query(`SELECT DISTINCT m.model_id, modelName, inProduction, modelDescription, modelVersion, accuracy, r.editedTime
                                            FROM Model m JOIN (SELECT model_id, accuracy FROM ( SELECT *, row_number() OVER 
                                            (PARTITION BY model_id ORDER BY time DESC) rn
                                            FROM Drift) d WHERE rn = 1) p ON m.model_id = p.model_id JOIN (SELECT model_id, MAX(time) as editedTime FROM Results
                                            WHERE model_id IN (SELECT model_id FROM Model) GROUP BY model_id) r ON r.model_id = m.model_id;`, { type: QueryTypes.SELECT })
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
      res.status(400).send({
        error: err.message || 'An error has ocurred.'
      })
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
      let { id } = req.params

      if (id === -1) {
        const index = await sequelize.query('SELECT model_id as cid FROM Model where inProduction = 1', { type: QueryTypes.SELECT })
        id = index[0].cid
      }

      const test = {}
      test.id = id

      // load correct model
      const handler1 = tfn.io.fileSystem(process.cwd() + '/src/production_models/uvi_model_1/UVImodel.json')
      const UVImodel = await tfn.loadLayersModel(handler1)

      const handler2 = tfn.io.fileSystem(process.cwd() + '/src/production_models/model_' + String(id) + '/model.json')
      const predModel = await tfn.loadLayersModel(handler2)

      // load yesterday UVI
      let today = new Date()
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
      const uviTensor = tfn.tensor3d([input])
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
      const inputTensor = tfn.tensor2d(weatherItems)
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
        if (condition === 1 && uviPred > 3) {
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

      today = new Date().toISOString().slice(0, 10)
      await sequelize.query('DELETE FROM Drift WHERE model_id = ' + id + " AND time >= str_to_date('" +
        today + "', '%Y-%m-%d')", { type: QueryTypes.DELETE })

      let lastPred = await sequelize.query('SELECT time FROM Results WHERE model_id = ' + id +
        ' AND time = (SELECT MAX(time) FROM Results) LIMIT 1;', { type: QueryTypes.SELECT })
      lastPred = lastPred[0].time.toISOString().slice(0, 10)
      const records = await sequelize.query('SELECT prediction, actual, time FROM Results WHERE model_id = ' + id +
        " AND time >= str_to_date('" + lastPred + "', '%Y-%m-%d')", { type: QueryTypes.SELECT })

      let tp = 0; let tn = 0; let fn = 0; let fp = 0
      records.forEach(confusion)
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
      if ((tp + fn) < (tn + fp)) {
        const temptp = tp
        tp = tn
        tn = temptp
        const tempfp = fp
        fp = fn
        fn = tempfp
      }
      const acc = (tp + tn) / (tp + tn + fp + fn)
      const pre = (tp + fp) === 0 ? 0 : tp / (tp + fp)
      const rec = (tp + fn) === 0 ? 0 : tp / (tp + fn)
      const f1 = (pre + rec) === 0 ? 0 : 2 * pre * rec / (pre + rec)
      const chi = (tp + fn) === 0 || (tn + fp) === 0 ? 0 : (fp - fn) ** 2 / (tp + fn) + (fn - fp) ** 2 / (tn + fp)

      await Drift.create({
        model_id: id,
        time: today,
        accuracy: acc,
        precision: pre,
        recall: rec,
        f1_score: f1,
        chi_square: chi
      })

      res.send(test)
    } catch (err) {
      res.status(400).send(err.message)//
    }
  }
}

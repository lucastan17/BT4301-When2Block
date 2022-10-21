const db = require('../models')
const sequelize = db.sequelize
const { QueryTypes } = require('sequelize')

module.exports = {
  async index (req, res) {
    let result = {}
    try {
      const firstPredDate = await sequelize.query('SELECT MIN(time) as min_time FROM Results', { type: QueryTypes.SELECT })

      if (firstPredDate[0].min_time === undefined) {
        result = { msg: 'No predictions to show.' }
      } else {
        let records = []
        let lastPred = await sequelize.query('SELECT time, model_id FROM Results ' +
          'WHERE time = (SELECT MAX(time) FROM Results) LIMIT 1;', { type: QueryTypes.SELECT })
        const modelId = lastPred[0].model_id
        lastPred = lastPred[0].time
        let maxDate = await sequelize.query('SELECT MAX(time) as time FROM Drift WHERE model_id = ' + modelId,
          { type: QueryTypes.SELECT })
        maxDate = maxDate[0].time
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        const maxDateStr = maxDate.toISOString().slice(0, 10)
        const lastPredStr = lastPred.toISOString().slice(0, 10)

        if (maxDateStr !== lastPredStr) {
          if (maxDate === undefined) {
            records = await sequelize.query('SELECT CAST(time AS DATE) as date, prediction, actual FROM Results WHERE model_id = ' +
              modelId + ' ORDER BY time', { type: QueryTypes.SELECT })
          } else {
            maxDate = new Date(maxDate)
            console.log(maxDate)
            const lastDate = new Date(Math.max(maxDate, thirtyDaysAgo)).toISOString().slice(0, 19)
            const query = "SELECT CAST(time AS DATE) as date, prediction, actual FROM Results WHERE time >= str_to_date('" +
            lastDate + "', '%Y-%m-%dT%H:%i:%s') AND model_id = " + modelId
            records = await sequelize.query(query, { type: QueryTypes.SELECT })
          }

          const confMat = {}
          records.forEach(confusion)

          function confusion (item) {
            const date = item.date
            if (!(date in confMat)) {
              confMat[date] = { tp: 0, tn: 0, fn: 0, fp: 0 }
            }
            if (item.prediction === item.actual && item.actual) {
              confMat[date].tp += 1
            } else if (item.prediction === item.actual && !item.actual) {
              confMat[date].tn += 1
            } else if (item.prediction !== item.actual && item.actual) {
              confMat[date].fn += 1
            } else {
              confMat[date].fp += 1
            }
          }

          const newValues = []
          Object.entries(confMat).forEach(metric)

          function metric (item) {
            const [date, val] = item
            const acc = (val.tp + val.tn) / (val.tp + val.tn + val.fp + val.fn)
            const pre = val.tp / (val.tp + val.fp)
            const rec = val.tp / (val.tp + val.fn)
            const f1 = 2 * pre * rec / (pre + rec)
            const chi = (val.fp - val.fn) ** 2 / (val.tp + val.fn) + (val.fn - val.fp) ** 2 / (val.tn + val.fp)
            newValues.push({
              model_id: modelId, time: date, accuracy: acc, precision: pre, recall: rec, f1_score: f1, chi_square: chi
            })
          }
          await db.drift.bulkCreate(newValues)
        }
        thirtyDaysAgo.setHours(0, 0, 0, 0)
        const rawResult = await sequelize.query('SELECT CAST(time AS DATE) as date, accuracy, `precision`, recall, f1_score, chi_square ' +
          "FROM Drift WHERE time >= str_to_date('" + thirtyDaysAgo.toISOString().slice(0, 19) + "', '%Y-%m-%dT%H:%i:%s') " +
          'AND model_id = ' + modelId, { type: QueryTypes.SELECT })

        const dates = []
        const aot = []
        const pot = []
        const rot = []
        const fot = []
        const cot = []

        rawResult.forEach((item) => {
          dates.push(item.date)
          aot.push(item.accuracy)
          pot.push(item.precision)
          rot.push(item.recall)
          fot.push(item.f1_score)
          cot.push(item.chi_square)
        })
        result = { dates, aot, pot, rot, fot, cot, model_id: modelId }
      }
      res.send(result)
    } catch (err) {
      result.err = err.error
      res.send(result)
    }
  }
}

/*
steps:
1. check drift table for latest date and model id.
2. take diff = max(now - 30 days, now - latest date in drift table) ie. find min number of days we need to calc for.
3. for each day within this period, retrieve and count true positive true negative etc, then calc accuracy etc
4. push each day into drift model
*/

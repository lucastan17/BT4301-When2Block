const db = require('../models')
const sequelize = db.sequelize
const { QueryTypes } = require('sequelize')

module.exports = {
  async index (req, res) {
    let result = {}
    try {
      const model = await sequelize.query('SELECT model_id FROM Model WHERE inProduction = 1;',
        { type: QueryTypes.SELECT })
      const modelId = model[0].model_id
      if (modelId === undefined) {
        result = { model_id: null }
      } else {
        const firstPredDate = await sequelize.query('SELECT MIN(time) as min_time FROM Results WHERE model_id = ' + modelId,
          { type: QueryTypes.SELECT })
        if (firstPredDate[0].min_time === undefined) {
          result = { dates: null, model_id: modelId }
        } else {
          let records = []

          const today = new Date().toISOString().slice(0, 10)
          await sequelize.query('DELETE FROM Drift WHERE model_id = ' + modelId + " AND time >= str_to_date('" +
            today + "', '%Y-%m-%d')", { type: QueryTypes.DELETE })

          let lastPred = await sequelize.query('SELECT CAST(time AS date) as time FROM Results WHERE model_id = ' + modelId +
            ' AND time = (SELECT MAX(time) FROM Results) LIMIT 1;', { type: QueryTypes.SELECT })
          lastPred = lastPred[0].time

          let maxDate = await sequelize.query('SELECT CAST(MAX(time) AS date) as time FROM Drift WHERE model_id = ' + modelId,
            { type: QueryTypes.SELECT })
          maxDate = maxDate[0].time

          const thirtyDaysAgo = new Date()
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

          if (maxDate === undefined) {
            const query = 'SELECT CAST(time AS DATE) as date, prediction, actual FROM Results WHERE model_id = ' + modelId
            records = await sequelize.query(query, { type: QueryTypes.SELECT })
          } else {
            maxDate = new Date(maxDate)
            lastPred = new Date(lastPred)
            const maxDateStr = maxDate.toISOString().slice(0, 10)
            const lastPredStr = lastPred.toISOString().slice(0, 10)
            if (maxDateStr !== lastPredStr) {
              maxDate.setDate(maxDate.getDate() + 1)
              const lastDate = new Date(Math.max(maxDate, thirtyDaysAgo)).toISOString().slice(0, 10)
              const query = 'SELECT CAST(time AS DATE) as date, prediction, actual FROM Results WHERE ' +
                "time >= str_to_date('" + lastDate + "', '%Y-%m-%d') AND model_id = " + modelId
              records = await sequelize.query(query, { type: QueryTypes.SELECT })
            }
          }

          if (records !== []) {
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
              let tp = 0; let tn = 0; let fn = 0; let fp = 0
              if ((val.tp + val.fn) < (val.tn + val.fp)) {
                tp = val.tn
                tn = val.tp
                fp = val.fn
                fn = val.fp
              } else {
                tp = val.tp
                tn = val.tn
                fp = val.fp
                fn = val.fn
              }
              const acc = (tp + tn) / (tp + tn + fp + fn)
              const pre = (tp + fp) === 0 ? 0 : tp / (tp + fp)
              const rec = (tp + fn) === 0 ? 0 : tp / (tp + fn)
              const f1 = (pre + rec) === 0 ? 0 : 2 * pre * rec / (pre + rec)
              const chi = (tp + fn) === 0 || (tn + fp) === 0 ? 0 : (fp - fn) ** 2 / (tp + fn) + (fn - fp) ** 2 / (tn + fp)

              newValues.push({
                model_id: modelId, time: date, accuracy: acc, precision: pre, recall: rec, f1_score: f1, chi_square: chi
              })
            }
            await db.drift.bulkCreate(newValues)
          }

          console.log(thirtyDaysAgo.toISOString().slice(0, 10))

          const rawResult = await sequelize.query('SELECT CAST(time AS DATE) as date, accuracy, `precision`, recall, f1_score, chi_square ' +
            "FROM Drift WHERE time >= str_to_date('" + thirtyDaysAgo.toISOString().slice(0, 10) + "', '%Y-%m-%d') " +
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

// today's metrics need to replace each time
/*
if drift dh values ie maxdate undefined then retrieve everything in results
else
  if maxdate == today then -1
  if maxdate == lastpred then drift table is up to date else
  retrieve everything from after max of maxdate vs thirty days ago
*/

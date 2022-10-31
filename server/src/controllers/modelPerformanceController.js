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
        res.send({ model_id: null, acc: null })
      } else {
        let lastPred = await sequelize.query('SELECT time FROM Results WHERE model_id = ' + modelId +
          ' AND time = (SELECT MAX(time) FROM Results) LIMIT 1;', { type: QueryTypes.SELECT })
        lastPred = lastPred[0].time.toISOString().slice(0, 10)
        const query = 'SELECT prediction, actual, time FROM Results WHERE model_id = ' + modelId +
          " AND time >= str_to_date('" + lastPred + "', '%Y-%m-%d')"
        const records = await sequelize.query(query, { type: QueryTypes.SELECT })
        if (records[0] === undefined) {
          res.send({ model_id: modelId, acc: null })
        } else {
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
          const date = new Date(records[0].time).toISOString().slice(0, 10)
          result = { model_id: modelId, acc, pre, rec, f1, chi, date }
          res.send(result)
        }
      }
    } catch (err) {
      result.err = err.error
      res.send(result)
    }
  }
}

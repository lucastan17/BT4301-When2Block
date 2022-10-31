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
        const query = 'SELECT prediction, actual FROM Results WHERE time = (SELECT MAX(time) FROM Results) and model_id = ' + modelId
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
          const acc = (tp + tn) / (tp + tn + fp + fn)
          const pre = tp / (tp + fp)
          const rec = tp / (tp + fn)
          const f1 = 2 * pre * rec / (pre + rec)
          const chi = (fp - fn) ** 2 / (tp + fn) + (fn - fp) ** 2 / (tn + fp)
          result = { model_id: modelId, acc, pre, rec, f1, chi }
          res.send(result)
        }
      }
    } catch (err) {
      result.err = err.error
      res.send(result)
    }
  }
}

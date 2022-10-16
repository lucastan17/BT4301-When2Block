const db = require('../models')
const sequelize = db.sequelize
const { QueryTypes } = require('sequelize')

module.exports = {
  async index (req, res) {
    const result = {}
    try {
      const query = 'SELECT prediction, actual, proba'+
                    'FROM Results WHERE time = (SELECT MAX(time) FROM Results);'
      const result = await sequelize.query(query, { type: QueryTypes.SELECT })
      res.send(result[0])
    } catch (err) {
      result.err = err.error
      res.send(result)
    }
  }
}

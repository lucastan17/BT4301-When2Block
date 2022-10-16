const db = require('../models')
const sequelize = db.sequelize
const { QueryTypes, Op } = require('sequelize')
const results = db.results
const today = new Date()

function formatDate (dt) {
  const day = dt.getDate()
  const month = dt.getMonth() + 1
  const year = dt.getFullYear()
  return `${year}-${month}-${(day > 9 ? '' : '0') + day}`
}

// function sgTimeConverter(date) {
//   date.setTime(date.getTime() + 8 * 60 * 60 * 1000)
//   return date
// }

module.exports = {
  async index (req, res) {
    const result = {}
    try {
      // check if there is any data today, store in todayData
      const todayData = await sequelize.query(`SELECT * FROM results where date(time) = date '${formatDate(today)}'`, { type: QueryTypes.SELECT })
      result.today = todayData
      // logic to retrieve from db
      // need location and time
      const currDate = await sequelize.query('SELECT cast(results.time as date) date FROM results WHERE results.location ="test"', { type: QueryTypes.SELECT })
      result.currDate = currDate

      const UVI = await sequelize.query('SELECT * FROM results WHERE cast(results.time as date) >= cast(Date(Now()) as date)', { type: QueryTypes.SELECT })
      // result.curr = CURDATE()
      result.UVI = UVI

      const timeModel = await results.findAll({
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
      // send survey details to db
      // need user id and survey details
      const result = await db.results.create({
        // TO DO: user id from state
        model_id: req.body.model_id,
        location: req.body.location,
        time: req.body.time,
        weather: req.body.weather,
        uv_index: req.body.uv_index,
        prediction: req.body.prediction,
        actual: req.body.actual
      })
      res.send(result.toJSON())
    } catch (err) {
      // error handling
      res.status(400).send({
        error: err.message || 'An error has ocurred.'
      })
    }
  }
}

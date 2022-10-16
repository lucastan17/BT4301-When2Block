const db = require('../models')
const Dates = db.checkin

module.exports = {
  async getdates (req, res) {
    try {
      const dates = await Dates.findAll({
        attributes: ['checkin_date'],
        where: {
          user_id: req.body.params.id
        }
      })
      console.log(dates)
      res.send({
        dates
      })
    } catch (err) {
      res.status(400).send({
        error: err.message || 'An error has occurred trying to get dates.'
      })
    }
  },
  async checkin (req, res) {
    console.log(req.body)
    try {
      // send check in details to db
      // need user id and date
      const checkedin = await Dates.create({
        user_id: req.body.params.id,
        checkin_date: req.body.params.date
      })
      console.log(checkedin)
    } catch (err) {
      // error handling
      res.status(400).send({
        error: err.message || 'An error has occurred trying to check in.'
      })
    }
  }
}

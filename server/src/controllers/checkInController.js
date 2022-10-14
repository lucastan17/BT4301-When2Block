const db = require('../models')
const Dates = db.checkin

module.exports = {
  async index (req, res) {
    try {
      // logic to retrive check in details from db
      // need userid
      const { id } = req.body
      const dates = await Dates.findAll({
        attributes: ['checkin_date'],
        where: {
          id
        }
      })
      console.log(dates)
      res.send({
        dates: dates.toJSON()
      })
    } catch (err) {
      // error handling
    }
  },
  async post (req, res) {
    try {
      // send check in details to db
      // need user id and date
      const checkedin = await Dates.create({
        id: req.body.id,
        date: req.body.date
      })
      res.send(checkedin.toJSON())
    } catch (err) {
      // error handling
    }
  }
}

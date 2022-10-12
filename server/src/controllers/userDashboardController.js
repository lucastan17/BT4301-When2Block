const db = require('../models')
const sequelize = db.sequelize
const { QueryTypes } = require('sequelize')

module.exports = {
  async index (req, res) {
    const result = {}
    try {
      const never = await sequelize.query('SELECT COUNT(*) as actualNumber FROM survey WHERE survey.survey_id = 1 AND survey.sunscreen_freq = "NEVER";', { type: QueryTypes.SELECT })
      result.never = never[0]

      const monthly = await sequelize.query('SELECT COUNT(*) as actualNumber FROM survey WHERE survey.survey_id = 1 AND survey.sunscreen_freq = "MONTHLY";', { type: QueryTypes.SELECT })
      result.monthly = monthly[0]

      const weekly = await sequelize.query('SELECT COUNT(*) as actualNumber FROM survey WHERE survey.survey_id = 1 AND survey.sunscreen_freq = "WEEKLY";', { type: QueryTypes.SELECT })
      result.weekly = weekly[0]

      const daily = await sequelize.query('SELECT COUNT(*) as actualNumber FROM survey WHERE survey.survey_id = 1 AND survey.sunscreen_freq = "DAILY";', { type: QueryTypes.SELECT })
      result.daily = daily[0]

      const totalUsers = await sequelize.query('SELECT COUNT(DISTINCT(users.user_id)) as total FROM users;', { type: QueryTypes.SELECT })
      result.totalUsers = totalUsers[0]
      result.never.percentage = result.never.actualNumber * 100 / result.totalUsers.total
      result.monthly.percentage = result.monthly.actualNumber * 100 / result.totalUsers.total
      result.weekly.percentage = result.weekly.actualNumber * 100 / result.totalUsers.total
      result.daily.percentage = result.daily.actualNumber * 100 / result.totalUsers.total

      const totalCount = await sequelize.query(' SELECT COUNT(a.user_id) as totalCount FROM (SELECT DISTINCT(user_id) FROM check_in) a INNER JOIN (SELECT user_id, sunscreen_freq FROM  survey WHERE sunscreen_freq = "NEVER") b ON a.user_id = b.user_id;', { type: QueryTypes.SELECT })
      result.totalCount = totalCount[0].totalCount

      const userProportion = []
      userProportion.push(result.never.actualNumber)
      userProportion.push(result.monthly.actualNumber)
      userProportion.push(result.weekly.actualNumber)
      userProportion.push(result.daily.actualNumber)

      result.userProportion = userProportion

      const userData = []
      for (let i = 6; i > 0; i--) {
        const month = 12 // new Date().getMonth()
        const monthIndex = month - i
        const statement = `SELECT COUNT(DISTINCT(a.user_id)) as count FROM (SELECT user_id, sunscreen_freq FROM survey WHERE sunscreen_freq = 'NEVER') a INNER JOIN (SELECT * FROM check_in WHERE checkin_date <=  CAST('2022-${monthIndex}-0' AS DATE)) b ON a.user_id = b.user_id; `
        const value = await sequelize.query(statement, { type: QueryTypes.SELECT })
        userData.push(value[0].count)
      }

      result.userData = userData

      res.send(result)
    } catch (err) {
      // result.err = err.error
      // res.send(result)
    }
  }
}

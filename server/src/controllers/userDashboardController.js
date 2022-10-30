const db = require('../models')
const sequelize = db.sequelize
const { QueryTypes } = require('sequelize')

module.exports = {
  async index (req, res) {
    const result = {}
    try {
      const never = await sequelize.query('SELECT COUNT(*) as actualNumber FROM Surveys WHERE Surveys.survey_id = 1 AND Surveys.sunscreen_freq = "never";', { type: QueryTypes.SELECT })
      result.never = never[0]

      const monthly = await sequelize.query('SELECT COUNT(*) as actualNumber FROM Surveys WHERE Surveys.survey_id = 1 AND Surveys.sunscreen_freq = "monthly";', { type: QueryTypes.SELECT })
      result.monthly = monthly[0]

      const weekly = await sequelize.query('SELECT COUNT(*) as actualNumber FROM Surveys WHERE Surveys.survey_id = 1 AND Surveys.sunscreen_freq = "weekly";', { type: QueryTypes.SELECT })
      result.weekly = weekly[0]

      const daily = await sequelize.query('SELECT COUNT(*) as actualNumber FROM Surveys WHERE Surveys.survey_id = 1 AND Surveys.sunscreen_freq = "daily";', { type: QueryTypes.SELECT })
      result.daily = daily[0]

      const totalUsers = await sequelize.query('SELECT COUNT(DISTINCT(Users.user_id)) as total FROM Users WHERE admin_user != 1;', { type: QueryTypes.SELECT })
      result.totalUsers = totalUsers[0]
      result.never.percentage = result.never.actualNumber * 100 / result.totalUsers.total
      result.monthly.percentage = result.monthly.actualNumber * 100 / result.totalUsers.total
      result.weekly.percentage = result.weekly.actualNumber * 100 / result.totalUsers.total
      result.daily.percentage = result.daily.actualNumber * 100 / result.totalUsers.total

      const totalCount = await sequelize.query('SELECT COUNT(a.user_id) as totalCount FROM (SELECT DISTINCT(user_id) FROM Check_in) a INNER JOIN (SELECT user_id, sunscreen_freq FROM Surveys WHERE sunscreen_freq = "never") b ON a.user_id = b.user_id;', { type: QueryTypes.SELECT })
      result.totalCount = totalCount[0].totalCount

      const userProportion = []
      userProportion.push(result.never.actualNumber)
      userProportion.push(result.monthly.actualNumber)
      userProportion.push(result.weekly.actualNumber)
      userProportion.push(result.daily.actualNumber)

      result.userProportion = userProportion

      const userData = []
      for (let i = 6; i > 0; i--) {
        const month = new Date().getMonth() + 3
        const monthIndex = month - i
        const statement = `SELECT COUNT(DISTINCT(a.user_id)) as count FROM (SELECT user_id, sunscreen_freq FROM Surveys WHERE sunscreen_freq = 'never') a INNER JOIN (SELECT * FROM Check_in WHERE checkin_date <=  CAST('2022-${monthIndex}-1' AS DATE)) b ON a.user_id = b.user_id;`
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

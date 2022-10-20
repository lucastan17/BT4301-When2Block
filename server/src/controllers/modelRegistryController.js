const { QueryTypes } = require('sequelize')
const db = require('../models')
const sequelize = db.sequelize

module.exports = {
  async index (req, res) {
    try {
      // logic to retrive model details from db
      // need model id and time
      const models = await sequelize.query(`SELECT m.model_id, modelName, inProduction, modelDescription, modelVersion, editedTime, accuracy
                                        FROM Model m JOIN Drift d ON m.model_id=d.model_id 
                                        WHERE time IN (SELECT MAX(time) FROM Drift 
                                        WHERE model_id IN (SELECT model_id FROM Model) 
                                        GROUP BY model_id)
                                        ORDER BY m.model_id;`, { type: QueryTypes.SELECT })
      const modelDetails = {}
      modelDetails.models = models
      res.send(modelDetails)
    } catch (err) {
      // error handling
      // res.send('ERROR' + err)
    }
  },
  async post (req, res) {
    try {
      // send new model details
      // need model details and time
      const { id } = req.params
      await sequelize.transaction(async (transaction) => {
        const currInProduction = await db.model.findOne({
          where: {
            inProduction: 1
          }
        }, { transaction })
        if (currInProduction && currInProduction.model_id === id) {
          res.status(200).send('Already In Use')
          return
        }
        await db.model.update({
          inProduction: 0
        }, {
          where: {
            model_id: currInProduction.model_id
          }
        }, { transaction })
        await db.model.update({
          inProduction: 1
        }, {
          where: {
            model_id: id
          }
        }, { transaction })
      })
      res.status(200).send('Model Deployment Updated')
    } catch (err) {
      // error handling
      res.status(400).send({
        error: err.message || 'An error has ocurred.'
      })
    }
  }
}

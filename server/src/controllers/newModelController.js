const db = require('../models')
const sequelize = db.sequelize
const { QueryTypes } = require('sequelize')
const Model = db.model // TODO: create new Model - store model name, description, version, production

module.exports = {
  async post (req, res) {
    try {
      await Model.destroy({
        where: {
          modelName: req.body.modelName,
          modelDescription: req.body.modelDescription,
          modelVersion: req.body.modelVersion
        }
      })

      let newId = 0
      const index = await sequelize.query('SELECT MAX(model_id) as id FROM Model', { type: QueryTypes.SELECT })
      if (index != null) {
        newId = index[0].id + 1 // would've incremented by one after adding text columns
      }

      await Model.create({
        model_id: newId,
        modelName: req.body.modelName, // req.body.modelName,
        modelDescription: req.body.modelDescription, // req.body.modelDescription,
        modelVersion: req.body.modelVersion, // req.body.modelVersion
        inProduction: 0
      })
    } catch (err) {
      res.send('ERROR' + err.message)
      // error handling
    }
  }
}

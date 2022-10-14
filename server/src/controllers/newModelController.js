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

      const index = await sequelize.query('SELECT MAX(model_id) as id FROM model', { type: QueryTypes.SELECT })
      const newId = index[0].id + 1

      await Model.create({
        model_id: newId,
        modelName: req.body.modelName, // req.body.modelName,
        modelDescription: req.body.modelDescription, // req.body.modelDescription,
        modelVersion: req.body.modelVersion // req.body.modelVersion
      })
    } catch (err) {
      // res.send('ERROR' + err)
      // error handling
    }
  }
}

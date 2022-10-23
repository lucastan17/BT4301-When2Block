const db = require('../models')
const sequelize = db.sequelize
const { QueryTypes } = require('sequelize')
const fs = require('fs') // for folder

module.exports = {
  async post (req, res) {
    try {
      let newId = 0
      const index = await sequelize.query('SELECT MAX(model_id) as id FROM Model', { type: QueryTypes.SELECT })
      if (index != null) {
        newId = index[0].id + 1 // would've incremented by one after adding text columns
      }

      // const folderName = process.cwd() + '\\src\\production_models\\model_' + (newId).toString()
      const mainFolder = process.cwd() + '/src/production_models'
      if (!fs.existsSync(mainFolder)) {
        fs.mkdirSync(mainFolder)
      }

      const folderName = process.cwd() + '/src/production_models/model_' + (newId).toString()
      if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName)
      }
      res.send(folderName)

      const myFile = req.files.file

      myFile.mv(folderName + '/' + myFile.name, function (err) {
        if (err) {
          console.log(err)
          return res.status(500).send({ msg: 'Error occured' })
        }
      })
    } catch (err) {
      res.send('ERROR' + err.message)
      // error handling
    }
  }
}

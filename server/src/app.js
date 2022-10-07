
const express = require('express')
const bodyParser = require('body-parser')
const { sequelize } = require('./models')
const config = require('./config/config')

const app = express()
app.use(bodyParser.json())

require('./passport')

require('./routes')(app)

sequelize.sync({ force: false })
  .then(() => {
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })

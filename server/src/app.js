
const express = require('express')
const bodyParser = require('body-parser')
const { sequelize } = require('./models')
const config = require('./config/config')
const cors = require('cors')

const corsConfig = {
  credentials: true,
  origin: true
}

const app = express()
app.use(cors(corsConfig))
app.use(bodyParser.json())

require('./passport')

require('./routes')(app)

sequelize.sync({
  force: false, // To create table if exists , so make it false
  alter: true // To update the table if exists , so make it true
})
  .then(() => {
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })

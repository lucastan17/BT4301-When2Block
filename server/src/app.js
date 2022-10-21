const express = require('express')
const bodyParser = require('body-parser')
const { sequelize } = require('./models')
const config = require('./config/config')
const cors = require('cors')
const morgan = require('morgan')
const fileupload = require('express-fileupload')

const corsConfig = {
  credentials: true,
  origin: true
}

const app = express()
app.use(cors(corsConfig))
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: false
}))
app.use(fileupload())

require('./routes')(app)

sequelize.sync({
  force: false, // To create table if exists , so make it false
  alter: true // To update the table if exists , so make it true
})
  .then(() => {
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })

const authController = require('./controllers/authController')
const authControllerPolicy = require('./policies/authControllerPolicy')
const surveyController = require('./controllers/surveyController')
const searchController = require('./controllers/searchController')
const checkInController = require('./controllers/checkInController')
const profileController = require('./controllers/profileController')
const modelPerformanceController = require('./controllers/modelPerformanceController')
const modelDriftController = require('./controllers/modelDriftController')
const userDashboardController = require('./controllers/userDashboardController')
const modelRegistryController = require('./controllers/modelRegistryController')
const newModelController = require('./controllers/newModelController')
const jsonFileController = require('./controllers/jsonFileController')
const weightsFileController = require('./controllers/weightsFileController')

module.exports = (app) => {
  app.post('/register',
    authControllerPolicy.register,
    authController.register
  )
  app.post('/login',
    authController.login
  )

  // endpoint for survey
  app.post('/survey',
    surveyController.post
  )

  // endpoint for survey
  app.post('/answer',
    surveyController.answer
  )

  // endpoint for search page
  app.get('/search',
    searchController.index
  )
  app.post('/search',
    searchController.post
  )
  // endpoints for check in
  app.post('/getdates',
    checkInController.getdates
  )
  app.post('/checkin',
    checkInController.checkin
  )

  // endpoints for user profile
  app.post('/changepw',
    profileController.changepw
  )

  // endpoints for user profile
  app.post('/profile',
    profileController.profile
  )

  // endpoints for model dashboard
  app.get('/model-performance',
    modelPerformanceController.index
  )
  app.get('/model-drift',
    modelDriftController.index
  )

  // endpoint for user dashboard
  app.get('/userDashboard',
    userDashboardController.index
  )

  // endpoints for model registry
  app.get('/model-registry',
    modelRegistryController.index
  )
  app.post('/model-registry/:id',
    modelRegistryController.post
  )
  app.post('/model-refresh/:id',
    modelRegistryController.refresh
  )

  app.post('/model-register',
    newModelController.post
  )

  app.post('/json-file-upload',
    jsonFileController.post
  )

  app.post('/weights-file-upload',
    weightsFileController.post
  )
}

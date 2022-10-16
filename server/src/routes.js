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

// const isAuth = require('./policies/isAuth')
// const isAdmin = require('./policies/isAdmin')

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
    // isAuth,
    surveyController.post
  )

  // endpoint for survey
  app.post('/answer',
    surveyController.answer
  )

  // endpoint for search page
  app.get('/search',
    // isAuth,
    searchController.index
  )
  app.post('/search',
    // isAuth,
    searchController.post
  )
  // endpoints for check in
  app.post('/getdates',
    // isAuth,
    checkInController.getdates
  )
  app.post('/checkin',
    // isAuth,
    checkInController.checkin
  )

  // endpoints for user profile
  app.post('/changepw',
    // isAuth,
    profileController.changepw
  )

  // endpoints for user profile
  app.post('/profile',
    // isAuth,
    profileController.profile
  )

  // endpoint for model dashboard
  app.get('/model-performance',
    // isAuth,
    // isAdmin,
    modelPerformanceController.index
  )

  app.get('/model-drift',
    // isAuth,
    // isAdmin,
    modelDriftController.index
  )

  // endpoint for user dashboard
  app.get('/userDashboard',
    // isAuth,
    // isAdmin,
    userDashboardController.index
  )

  // endpoints for model registry
  app.get('/modelRegistry',
    // isAuth,
    // isAdmin,
    modelRegistryController.index
  )
  app.post('/modelRegistry',
    // isAuth,
    // isAdmin,
    modelRegistryController.post
  )

  app.post('/model-register',
  //   // isAuth
  //   // upload.single('myJsonFile'),
    newModelController.post
  )

  app.post('/json-file-upload',
    jsonFileController.post
  )

  app.post('/weights-file-upload',
    weightsFileController.post
  )
}

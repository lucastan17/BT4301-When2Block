const authController = require('./controllers/authController')
const authControllerPolicy = require('./policies/authControllerPolicy')
const surveyController = require('./controllers/surveyController')
const searchController = require('./controllers/searchController')
const checkInController = require('./controllers/checkInController')
const profileController = require('./controllers/profileController')
const modelDashboardController = require('./controllers/modelDashboardController')
const userDashboardController = require('./controllers/userDashboardController')
const modelRegistryController = require('./controllers/modelRegistryController')

const isAuth = require('./policies/isAuth')
const isAdmin = require('./policies/isAdmin')

module.exports = (app) => {
  //endpoints for authentication
  app.post('/register',
    authControllerPolicy.register,
    authController.register
  )
  app.post('/login',
    authController.login
  )

  //endpoint for survey
  app.post('/survey',
    surveyController.post
  )

  //endpoint for search page
  app.get('/search',
    isAuth,  
    searchController.index
  )

  //endpoints for check in
  app.get('/checkin',
    isAuth,
    checkInController.index
  )
  app.post('/checkin',
    isAuth,
    checkInController.post
  )
  app.delete('/checkin',
    isAuth,
    checkInController.remove
  )

  //endpoints for user profile
  app.get('/profile',
    isAuth,
    profileController.index
  )
  app.update('/profile',
    isAuth,
    profileController.update
  )

  //endpoint for model dashboard
  app.get('/modelDashboard',
    isAuth,
    isAdmin,
    modelDashboardController.index
  )

  //endpoint for user dashboard
  app.get('/userDashboard',
    isAuth,
    isAdmin,
    userDashboardController.index
  )

  //endpoints for model registry
  app.get('/modelRegistry',
    isAuth,
    isAdmin,
    modelRegistryController.index
  )
  app.post('/modelRegistry',
    isAuth,
    isAdmin,
    modelRegistryController.post
  )
}
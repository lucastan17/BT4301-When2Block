
const passport = require('passport')

module.exports = function (req, res, next) {
  passport.authenticate('jwt', function (err, user) {
    if (err || !user) {
      // error handling
    } else {
      req.user = user
      next()
    }
  })(req, res, next)
}

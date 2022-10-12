const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().regex(/^.{8,}$/).required(),
      admin_user: Joi.boolean()
    })

    const { error, value } = schema.validate(req.body)

    if (error) {
      console.log(error, value)
      switch (error.details[0].type) {
        case 'string.empty':
          res.status(400).send({
            error: 'Fields cannot be empty.'
          })
          break
      }

      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address.'
          })
          break
        case 'password':
          res.status(400).send({
            error: 'The password must be at least 8 characters in length.'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration.'
          })
      }
    } else {
      next()
    }
  }

}

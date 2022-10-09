// const Joi = require('joi')

// pattern = '/^[a-zA-Z0-9]{8,32}$/'

module.exports = {
  register (req, res, next) {
    // validation schema for registration
    const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })

    const { error } = schema.validate(req.body)

    if (error) {
      console.log(error)
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address'
          })
          break
        case 'password':
          res.status(400).send({
            error: `The password provided did not match the following rules
              <br>
              1. It must contain ONLY the following characters: lower case, upper case, numbers.
              <br>
              2. It must be at least 8 characters in length.`
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration information'
          })
      }
    } else {
      next()
    }
  }
}
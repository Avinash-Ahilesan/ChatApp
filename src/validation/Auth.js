const Joi = require('@hapi/joi')

const registerSchema = Joi.object({
    email: Joi.string().email().min(8).max(254).lowercase().trim().required(),
    name: Joi.string().min(3).max(128).trim().required(),
    password: Joi.string().min(8).max(128).required(), 
    passwordConfirmation: Joi.valid(Joi.ref('password')).required()
})

module.exports = {registerSchema}
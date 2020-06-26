const Joi = require('@hapi/joi')

const email = Joi.string().email().min(8).max(254).lowercase().trim().required()
const username  = Joi.string().min(3).max(128).trim().required()
const fullname  = Joi.string().min(3).max(128).trim().required()
const password = Joi.string().min(8).max(128)
    .regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
    .message('"{#label}" must contain one uppercase letter, one lowercase letter, and one digit')
    .required()
const passwordConfirmation = Joi.valid(Joi.ref('password')).required()

const registerSchema = Joi.object({
    email,
    username,
    fullname,
    password,
    passwordConfirmation
})

const loginSchema = Joi.object({
    email,
    password
})

module.exports = {registerSchema, loginSchema}
const Joi = require('@hapi/joi')
const username = require('./Auth').username


const friendRequestSchema = Joi.object({
    username
})
const acceptRequestSchema = Joi.object({
    reply: Joi.string().valid('accept', 'deny').required(),
    username
})
module.exports = {friendRequestSchema, acceptRequestSchema}
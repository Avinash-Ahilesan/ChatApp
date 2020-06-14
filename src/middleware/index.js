module.exports.guest = require('./Auth').guest
module.exports.auth = require('./Auth').auth
module.exports.catchAsync = require('./errors/Errors').catchAsync
module.exports.notFoundError = require('./errors/Errors').notFound
module.exports.internalServerError = require('./errors/Errors').internalServerError
module.exports.guest = require('./Auth')
module.exports.catchAsync = require('./errors/Errors').catchAsync
module.exports.notFoundError = require('./errors/Errors').notFound
module.exports.internalServerError = require('./errors/Errors').internalServerError
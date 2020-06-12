const catchAsync = (handler) =>
    (...args) => handler(...args).catch(args[2]);

const notFound = (req, res, next) => {
    res.status(404).json({message: 'Not Found'});
}

const internalServerError =  (err, req, res, next) => {
    if (!err.status) {
        console.error(err.stack)
    }
    res.status(err.status || 500).json({message: err.message || 'Internal Server Error'})
}

module.exports.catchAsync = catchAsync
module.exports.notFound = notFound
module.exports.internalServerError = internalServerError

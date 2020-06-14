const isLoggedIn = require('../Auth').isLoggedIn

const guest = (req, res, next) => {
    if (isLoggedIn(req)) {
        throw {status: 200, message: "You are already logged in"}
    }
    next()
}

const auth = (req, res, next) => {
    if (!isLoggedIn(req)) {
        throw {status: 401, message: "You must be logged in!"}
    }
    next()
}

module.exports = {guest, auth}
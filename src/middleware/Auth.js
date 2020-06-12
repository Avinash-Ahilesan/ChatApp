const isLoggedIn = require('../Auth').isLoggedIn

const guest = (req, res, next) => {
    if (isLoggedIn(req)) {
        throw "Already Logged In"
    }
    console.log()
    next()
}

module.exports = guest
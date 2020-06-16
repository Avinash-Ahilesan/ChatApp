const User = require("../models");
const isLoggedIn = require('../Auth').isLoggedIn
const SESSION_RENEWAL_TIMEOUT = process.env.SESSION_RENEWAL_TIMEOUT
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
const active = async (req, res, next) => {
    if (isLoggedIn(req)) {
        const now = Date.now();
        const {createdAt} = req.session;
        const expirationTime = createdAt + Number(SESSION_RENEWAL_TIMEOUT)
        if (now > expirationTime) {
            const user = User.findById(req.session.userId)
            req.session.regenerate(function(err) {
                if (err) return next(err)
                req.session.userId = user.id
            })
        }
    }

    next();
}
module.exports = {guest, auth, active}
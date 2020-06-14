const SESSION_NAME = require('../config/Session').SESSION_NAME
const isLoggedIn = (req) => {
    if (req.session !== null && typeof req.session !== 'undefined') {
        return !!req.session.userId
    }
}

const login = (req, userId) => {
    req.session.userId = userId
    req.session.createdAt = Date.now()
}
const logout = (req, res) =>
    new Promise((resolve, reject) => {
        if (req.session !== null && req.session !== 'undefined') {
            req.session.destroy((err) => {
                if (err)
                    reject(err)
                res.clearCookie(SESSION_NAME)

                resolve()
            })
        }
    })

module.exports = {  login, logout, isLoggedIn }
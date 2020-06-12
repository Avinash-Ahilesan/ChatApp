
const isLoggedIn = (req) => {
    if (req.session !== null && typeof req.session !== 'undefined') {
        return !!req.session.userId
    }
}

const login = (req, userId) => {
    req.session.userId = userId
    req.session.createdAt = Date.now()
}

module.exports = {  login, isLoggedIn }
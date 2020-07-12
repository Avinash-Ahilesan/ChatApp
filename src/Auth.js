const SESSION_NAME = require('../config/Session').SESSION_NAME
const Redis = require('ioredis')
const REDIS_OPTIONS = require('../config/Cache').REDIS_OPTIONS
const redis = new Redis(REDIS_OPTIONS)

//TODO: implement a status system such that its persisted to database, returns status of friends on friend list
const isLoggedIn = (req) => {
    if (req.session !== null && typeof req.session !== 'undefined') {
        return !!req.session.userId
    }
    return false;
}

const login = async (req, userId, userFriends, userFriendRequests) => {
    if (req.session !== null && req.session !== 'undefined') {
        req.session.userId = userId
        req.session.createdAt = Date.now()
    }
    redis.set(req.session.userId, {friends: userFriends, usrStatus: 'online', userFriendRequests: userFriendRequests}, 'ex', 500)
}
const logout = (req, res) =>
    new Promise((resolve, reject) => {
        if (req.session !== null && req.session !== 'undefined') {
            redis.del(req.session.userId).then(() => {
                req.session.destroy((err) => {
                    if (err)
                        reject(err)
                    res.clearCookie(SESSION_NAME)
                    resolve()
                })
            })
        }
    })

module.exports = {  login, logout, isLoggedIn }
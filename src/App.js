const register = require('./router')
const {notFoundError, internalServerError} = require('./middleware')
const session = require('express-session')
const express = require('express')
const SESSION_OPTIONS = require('../config/Session').SESSION_OPTIONS


const createApp = (store) => {
    const app = express()

    app.use(express.json())

    app.use(session({...SESSION_OPTIONS, store}))
    app.use(register)

    app.use(notFoundError)

    app.use(internalServerError)

    return app
}

exports.createApp = createApp;

const session = require('express-session')
const express = require('express')
const register = require('./routes').register
const login = require('./routes').login
const {notFoundError, internalServerError} = require('./middleware')
const SESSION_OPTIONS = require('../config/Session').SESSION_OPTIONS


const createApp = (store) => {
    const app = express()

    app.use(express.json())

    app.use(session({...SESSION_OPTIONS, store}))

    app.use(register)

    app.use(login)

    // ERROR HANDLERS

    app.use(notFoundError)
    app.use(internalServerError)


    return app
}

exports.createApp = createApp;
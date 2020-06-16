// import {IN_PROD} from "./app";
const IN_PROD = require("./App").IN_PROD
const HALF_HOUR = 1000 * 60 * 30;
const SIX_HOURS = HALF_HOUR * 12

 const {
    SESSION_SECRET = 'super secret code',
    SESSION_NAME = 'sid',
    SESSION_IDLE_TIMEOUT = HALF_HOUR,
     SESSION_RENEWAL_TIMEOUT = +SIX_HOURS
}   = process.env;

 const SESSION_OPTIONS = {
    secret: SESSION_SECRET,
    name: SESSION_NAME,
    cookie: {
        maxAge: +SESSION_IDLE_TIMEOUT,
        secure: IN_PROD,
        sameSite: true
    },
    rolling: true,
    resave: false,
    saveUninitialized: false
}
module.exports = { SESSION_OPTIONS, SESSION_NAME, SESSION_RENEWAL_TIMEOUT }
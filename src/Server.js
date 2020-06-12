
require('dotenv').config();

const connectRedis = require('connect-redis')
const Redis = require('ioredis')
const session = require('express-session')
const createApp = require('./App').createApp;
const APP_PORT = require('../config/App').APP_PORT
const REDIS_OPTIONS = require('../config/Cache').REDIS_OPTIONS
const MONGO_URI = require("../config/Db").MONGO_URI;
const MONGO_OPTIONS = require('../config/Db').MONGO_OPTIONS;
const mongoose = require('mongoose')

;(async () => {
    await mongoose.connect(MONGO_URI, MONGO_OPTIONS)

    const RedisStore = connectRedis(session)

    const client = new Redis(REDIS_OPTIONS)

    const store = new RedisStore({client })

    const app = createApp(store);

    app.listen(APP_PORT, () => console.log(`http://localhost:${APP_PORT}`));

})()



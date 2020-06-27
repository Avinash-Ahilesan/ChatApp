const {
    NODE_ENV = 'development',
    APP_PORT = 3001
} = process.env;

 const IN_PROD = NODE_ENV === 'production'

module.exports = {IN_PROD, APP_PORT}
const env = process.env.NODE_ENV || 'development'
const {environment} = require('./environment.' + env)
module.exports = environment
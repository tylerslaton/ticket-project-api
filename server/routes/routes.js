// Import all custom routers and export them for express.
const index = require('./index.js')
const sample = require('./sample.js')
const user = require('./user.js')

module.exports = {index, sample, user}

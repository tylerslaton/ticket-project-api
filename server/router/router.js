// Import all custom routers and export them for express.
const index = require('./routes/index.js')
const sample = require('./routes/sample.js')
const user = require('./routes/user.js')

module.exports = {index, sample, user}

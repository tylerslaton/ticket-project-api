// Import all custom routers and export them for express.
const index = require('./routes/index.js')
const sample = require('./routes/sample.js')
const user = require('./routes/user.js')
const venue = require('./routes/venue.js')
const event = require('./routes/event.js')

module.exports = {index, sample, user, venue, event}

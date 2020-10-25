// External packages
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

// Internal packages
const router = require('./router/router')
const customMiddleware = require('./middleware/middleware')
const db = require('./models/index');

// Express config
const app = express()
const port = 3000

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(customMiddleware.auth)

// Routes
app.use('/', router.index)
app.use('/user', router.user);
app.use('/venue', router.venue)
app.use('/sample', router.sample)

// sync our sequelize models and then start server
// force: true will wipe our database on each server restart
// this is ideal while we change the models around
db.sequelize.sync({ force: true }).then(() => {
  
  // inside our db sync callback, we start the server
  // this is our way of making sure the server is not listening 
  // to requests if we have not made a db connection
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
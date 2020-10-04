// External packages
const express = require('express')
const bodyParser = require('body-parser')

// Internal packages
const routes = require('./routes/routes.js')
const db = require('./models/index');

const app = express()
const port = 3000

// // Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', routes.user)

// // index route
// app.get('/', routes.index.index)

// // sample routes
// app.get('/sample', routes.sample.getAll)
// app.post('/sample', routes.sample.post)

// // sample/:id routes
// app.get('/sample/:id', routes.sample.get)
// app.put('/sample/:id', routes.sample.update)
// app.delete('/sample/:id', routes.sample.remove)


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
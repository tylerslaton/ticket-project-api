const db = require("../models");

const createEvent = (event) => {
  db.Event.create(event)
    .then(result => {
      console.log(result);
      
    })
}
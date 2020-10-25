const { Event }= require("../models");

const createEvent = async (event) => {
  try {
    const result = await Event.create(event);

    console.log("Controller", result);
    return result;
  } catch (err) {
    return err;
  }
}

const updateEvent = async (event, id) => {
  Event.update(event, { where : { id }})
    .then(result => {
      console.log(result);
      return result;
    })
    .catch(err => {
      console.log(err);
      return err;
    })
}

const findEvent = async (id) => {
  try {
    const event = await Event.findOne({ where: { id }})
    console.log(event);
    return event;
  } catch(err) {
    console.log(err);
  }
}

const findEvents = async (where) => {
  try {
    const events = await Event.findAll({ where });

    console.log(events);
  } catch (err) {
    console.log(err);

    return err;
  }
}

const deleteEvent = async (id) => {

  try {
    const event = await Event.destroy({ where: { id }});
    console.log(event);
    return event;
  } catch (err) {
    console.log(err);

    return err;
  }

}


module.exports = {
  createEvent,
  updateEvent,
  findEvent,
  findEvents,
  deleteEvent
}
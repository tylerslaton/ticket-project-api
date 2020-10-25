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

const updateEvent = async (event) => {
  try {
    const updatedEvent = await Event.upsert(event, { returning: true });
    return updatedEvent;
  } catch(err) {
    return err;
  }
}

const findEvent = async (id) => {
  try {
    const event = await Event.findOne({ where: { id }})
    return event;
  } catch(err) {
    return err;
  }
}

const findEvents = async (where) => {
  try {
    const events = await Event.findAll({ where });
    return events;
  } catch (err) {
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
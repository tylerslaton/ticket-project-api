const express = require('express');
const router = express.Router();

const { createEvent, updateEvent, findEvent, findEvents, deleteEvent } = require('../../controllers/events');

router.post('/', async (req, res) => {
  try {
    const event = await createEvent(req.body);
    if (event.errors?.length > 0) {
      res.status(400).json(event);
    }
    
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.put('/', async (req, res) => {
  try {
    const event = await updateEvent(req.body);
    if (event) {
      res.status(200).json(event);
    }

    res.status(404).json({
      message: 'No event found to update'
    })
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/all', async (req, res) => {
  let where = req.body;
  try {
    const events = await findEvents(where);
    console.log(events);
    if (events.length > 0) {
      res.status(200).json(events);
    }

    res.status(404).json({
      message: 'No events were found within the paremeters sent.'
    })
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/:id', async (req, res) => {
  let id = req.params.id;
  if (!parseInt(id)) {
    res.status(400).json({
      message: 'The sent id was not a valid event id'
    })
  }
  try {
    const event = await findEvent(id);

    if (event) {
      res.status(200).json(event);
    }
    res.status(404).json({
      message: 'Event not found for this id'
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  let id = req.params.id;
  if (!parseInt(id)) {
    res.status(400).json({
      message: 'The sent id was not a valid event id'
    })
  }
  try {
    const event = await deleteEvent(id);

    if (event) {
      res.status(200).json(event);
    }
  } catch (err) {
    res.status(500).json(err);
  }
})



module.exports = router;
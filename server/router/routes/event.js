const express = require('express');
const router = express.Router();

const { createEvent } = require('../../controllers/events');

router.post('/', async (req, res) => {
  try {
    const event = await createEvent(req.body);

    console.log("Router", event);

    res.status(200).json(event);
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
})


module.exports = router;
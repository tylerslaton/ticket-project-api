const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const { Venue } = require('../../models');

// Register Route
router.post('/', async (req, res) => {
    try {
        // Create the venue with the supplied data
        let venue = await Venue.create(
            req.body
        );

        // Respond with a 201
        return res.status(201).json(venue);
  
    } catch(err) {

        // If an error occurs, respond with a 400 error. Always blame it on the user B)
        return res.status(400).send(err);
    }
});

module.exports = router;
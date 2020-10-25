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

// Get route
router.get('/:id', async (req, res) => {
    try {
        // Create the venue with the supplied data
        let id = req.params.id
        let venue = await Venue.findOne({ where: { id } });

        // If there is a venue, respond with 200 and the data
        if (venue) {
            return res.status(200).json(venue);
        }

        // Respond with a 404 otherwise
        return res.status(404)

    } catch(err) {
        // If an error occurs, respond with a 400 error. Always blame it on the user B)
        return res.status(400).send(err);
    }    
});

// Update route
router.put('/:id', async (req, res) => {
    try {
        // Create the venue with the supplied data
        let id = req.params.id
        let venue = await Venue.findOne({ where: { id } });

        // If the venue is found, respond update it with the new data
        if (venue) {
            let resp = await venue.update(req.body);
            return res.status(201).json(resp);
        }

        // Respond with a 404 otherwise
        return res.status(404)

    } catch(err) {
        // If an error occurs, respond with a 400 error. Always blame it on the user B)
        return res.status(400).send(err);
    }    
});

module.exports = router;
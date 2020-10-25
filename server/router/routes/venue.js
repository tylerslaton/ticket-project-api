const express = require('express');

const router = express.Router();
const { Venue } = require('../../models');

/*
    NOTE: We should come back to this file and add some authentication to be able to do these. 
*/

// Create Route
router.post('/', async (req, res) => {
    try {
        // Create the venue with the supplied data
        let venue = await Venue.create( req.body );

        // Respond with a 201
        return res.status(201).json(venue);
  
    } catch(err) {
        // If an error occurs, log it and respond with a 500.
        console.log(err)

        // Check to see if we have a validation error from sequelize. If not,
        // go ahead and return a 500. Otherwise, a 400. 
        validationError = err.name == 'SequelizeValidationError';
        res.status(validationError ? 400 : 500).send(
            { errors: [{ message: `error occured: ${err}`}] }
        );
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
        return res.status(404).send()

    } catch(err) {
        // If an error occurs, log it and respond with a 500.
        console.log(err)
        res.status(500).send(
            { errors: [{ message: `error occured: ${err}` }] }
        );
    }    
});

// Update route
router.put('/:id', async (req, res) => {
    try {
        // If the venue is found and there is a body, update it with the new data
        if (req.body != {}) {
            let id = req.params.id
            let updated = await Venue.update(req.body, { where : { id } });

            // Determine if the update went through
            let status = updated[0] > 0 ? 200 : 404

            return res.status(status).send();
        }

        // Respond with a 400 otherwise
        return res.status(400).send('did not send a body with the request')

    } catch(err) {
        // If an error occurs, log it and respond with a 500.
        console.log(err)
        res.status(500).send(
            { errors: [{ message: `error occured: ${err}` }] }
        );
    }    
});

// Delete route
router.delete('/:id', async (req, res) => {
    try {
        // Create the venue with the supplied data
        let id = req.params.id
        let deleted = await Venue.destroy({where: {id}})
    
        // Determine if the delete went through
        let status = deleted ? 200 : 404

        return res.status(status).send();

    } catch(err) {
        // If an error occurs, log it and respond with a 500.
        console.log(err)
        res.status(500).send(
            { errors: [{ message: `error occured: ${err}` }] }
        );
    }    
});

module.exports = router;
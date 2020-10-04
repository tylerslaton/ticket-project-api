const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const { User } = require('../models');

// Register Route
router.post('/register', async (req, res) => {
    try {
        // Hash password
        const hash = bcrypt.hashSync(req.body.password, 10);

        // Create a new password from the hash
        let user = await User.create(
            Object.assign(req.body, { password: hash })
        );

        // Give the user an auth token to use
        let data = await user.authorize();

        // Respond with the auth token
        return res.json(data);
  
    } catch(err) {
        if ( !req.body.password){
            err = {
                "error": "request did not send a password"
            }
        }
        // If an error occurs, respond with a 400 error
        return res.status(400).send(err);
    }
});

module.exports = router;
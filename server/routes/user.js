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

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    // if the username / password is missing, we use status code 400
    // indicating a bad request was made and send back a message
    if (!username || !password) {
        return res.status(400).send(
            'Request missing username or password param'
        );
    }
  
    try {
        let user =  await User.authenticate(username, password)

        return res.json(user);

    } catch (err) {
        return res.status(400).send(`Error occured while attempting to sign in: ${err}`);
    }
  
});

// Logout Route
router.delete('/logout', async (req, res) => {
    // because the logout request needs to be send with
    // authorization we should have access to the user
    // on the req object, so we will try to find it and
    // call the model method logout
    const { user } = req
    const authToken = req.headers.authorization

    // we only want to attempt a logout if the user is
    // present in the req object, meaning it already
    // passed the authentication middleware. There is no reason
    // the authToken should be missing at this point, check anyway
    if (user && authToken) {
        await req.user.logout(authToken);
        return res.status(204).send()
    }

    // if the user missing, the user is not logged in, hence we
    // use status code 400 indicating a bad request was made
    // and send back a message
    return res.status(400).send(
        { errors: [{ message: 'not authenticated' }] }
    );
});

// Me Route
router.get('/me', (req, res) => {
    if (req.user) {
      return res.send(req.user);
    }
    res.status(404).send(
      { errors: [{ message: 'missing auth token' }] }
    );
  });

module.exports = router;
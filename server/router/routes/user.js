const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const { User } = require('../../models');

// Register Route
router.post('/register', async (req, res) => {
    try {
        // Hash password
        const hash = bcrypt.hashSync(req.body.password, 10);

        // Create a new password from the hash and the body of the 
        // request
        let user = await User.create(
            Object.assign(req.body, { password: hash })
        );

        // Give the user an auth token to use.
        let data = await user.authorize();

        // Respond with the auth token
        return res.status(201).json(data);
  
    } catch(err) {
        // Handles if a password was not sent
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
  
    // Validate that both a username and password is sent. If they aren't,
    // send a 400
    if (!username || !password) {
        return res.status(400).send(
            'Request missing username or password param'
        );
    }
  
    // Try to authenticate the user with the sent values and catch any exceptions
    try {
        let user =  await User.authenticate(username, password)

        return res.json(user);

    } catch (err) {
        return res.status(400).send(`Error occured while attempting to sign in: ${err}`);
    }
  
});

// Logout Route
router.delete('/logout', async (req, res) => {
    // Get the user from request
    const { user } = req
    const authToken = req.headers.authorization

    // If there is a user sent in from the middleware and an auth is in the header, logout
    if (user && authToken) {
        await req.user.logout(authToken);
        return res.status(204).send()
    }

    // If there is not a user or auth token, send a 400
    return res.status(400).send(
        { errors: [{ message: 'not authenticated' }] }
    );
});

// Update Route
router.put('/me', async (req, res) => {
    // Get the user from request
    const { user } = req
    const authToken = req.headers.authorization

    // If there is a user sent in from the middleware and an auth is in the header, logout
    if (user && authToken) {
        validInfo = extractInfo(req.body);
        if ( validInfo ) {
            userFound = await User.findOne({ where: { username: user.dataValues.username } })
            if ( userFound ){
                userFound.update(validInfo);
            }
        }

        // If we update the password, let's reauthenticate
        if (validInfo.password) {
            let data = await User.authenticate(validInfo.username, validInfo.rawPassword)
            return res.status(204).json(data);
        } else {
            return
        }
    }

    // Improve error handling here
    res.status(404).send(
        { errors: [{ message: 'missing valid auth token' }] }
    );
});

// Me Route
router.get('/me', async (req, res) => {
    if (req.user) {
        return res.send(req.user);
    }
    res.status(404).send(
        { errors: [{ message: 'missing valid auth token' }] }
    );
});

const extractInfo = (body) => {
    newInfo = {}
    // Find username
    if( body.username )
        newInfo.username = body.username;

    // Find email
    if( body.email ) 
        newInfo.email= body.email;

    // Find and hash password
    if( body.password ) {
        // Raw password for generating a new token after update
        newInfo.rawPassword = password = body.password
        // Hashed password updating in the DB
        newInfo.password = bcrypt.hashSync(body.password, 10);;
    }

    // If nothing is set, set to false
    if ( newInfo == {} )
        newInfo = false;

    return newInfo;
}

module.exports = router;
const express = require('express');
const router = express.Router();

// Just an example route, can basically ignore unless you need an example.
router.get = (req, res) => {
    testPL = {
        message: "Hello, world!"
    }

    res.json(testPL)
}

module.exports = router;
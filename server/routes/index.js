const express = require('express');
const router = express.Router();

// Get method
router.get = (req, res) => {
    testPL = {
        message: "Hello, world!"
    }

    res.json(testPL)
}

module.exports = router;
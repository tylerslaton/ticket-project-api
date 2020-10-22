const express = require('express');
const router = express.Router();

/*
 * GET /sample route to retrieve all the samples.
 */
router.get = ('/all', async (req, res) => {

});

/*
 * POST /sample to save a new sample.
 */
router.post = ('/', async (req, res) => {

});

/*
 * GET /sample/:id route to retrieve a sample given its id.
 */
router.get = ('/:id', async (req, res) => {

});

/*
 * DELETE /sample/:id to delete a sample given its id.
 */
router.delete = ('/:id', async (req, res) => {

});

/*
 * PUT /sample/:id to update a sample given its id
 */
router.put = ('/:id', async (req, res) => {

});

//export all the functions
module.exports = router;
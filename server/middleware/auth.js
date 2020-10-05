const { User, AuthToken } = require('../models');

module.exports = async function(req, res, next) {

    // Get the token from the authorization 
    const token = req.headers.authorization;

    // Need to have a token to logout, if it isn't there move on.
    if (token) {
        // Reach out to sequelize for the sent token
        const authToken = await AuthToken.findOne(
            { where: { token }, include: User }
        );

        // If found, add it into the request header.
        if (authToken) {
            req.user = authToken.User;
        }
    }
    
    // Move onto the next step in the middleware call stack
    next();
}
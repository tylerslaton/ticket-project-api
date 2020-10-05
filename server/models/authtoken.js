'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AuthToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AuthToken.belongsTo(models.User);
    }
  };
  // TODO: Found this from a tutorial, we can probably do something better here. Right now,
  //       it generates a fairly small auth token. Maybe passport.js?
  AuthToken.generate = async function(UserId) {
    if (!UserId) {
      throw new Error('AuthToken requires a user ID')
    }

    let token = '';

    // Generate a token with the specified characters are random
    const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
      'abcdefghijklmnopqrstuvwxyz0123456789';
      
    for (var i = 0; i < 15; i++) {
      token += possibleCharacters.charAt(
        Math.floor(Math.random() * possibleCharacters.length)
      );
    }

    return AuthToken.create({ token, UserId })
  }

  AuthToken.init({
    token: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'AuthToken',
  });
  return AuthToken;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Performer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Performer.belongsToMany(models.Event, { 
        through: "Event_Performer",
        as: "performers",
        foreignKey: "performer_id"
      });
    }
  };
  Performer.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Performer',
  });
  return Performer;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsToMany(models.Performer, { 
        through: "Event_Performer",
        as: "events",
        foreignKey: "event_id"
      });
      Event.hasOne(models.Venue);
    }
  };
  Event.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    datetime: DataTypes.DATE,
    datetime_utc: DataTypes.DATE,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cat = sequelize.define('Cat', {
    name: DataTypes.STRING,
    species: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Cat;
};
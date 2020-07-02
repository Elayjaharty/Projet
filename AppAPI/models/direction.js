'use strict';
module.exports = (sequelize, DataTypes) => {
  const Direction = sequelize.define('Direction', {
    nomDir: DataTypes.STRING
  }, {});
  Direction.associate = function(models) {
    // associations can be defined here
    models.Direction.hasMany(models.Utilisateur);
  };
  return Direction;
};
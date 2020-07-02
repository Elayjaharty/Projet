'use strict';
module.exports = (sequelize, DataTypes) => {
  const Demande = sequelize.define('Demande', {
    titre: DataTypes.STRING,
    contenue: DataTypes.STRING,
    refDm: DataTypes.STRING
  }, {});
  Demande.associate = function(models) {
    // associations can be defined here
    models.Demande.belongsTo(models.Utilisateur, {
      foreignKey: {
        allowNull: false
      }
    })
  };
  return Demande;
};
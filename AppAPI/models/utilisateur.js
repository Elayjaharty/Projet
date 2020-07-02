'use strict';
module.exports = (sequelize, DataTypes) => {
  const Utilisateur = sequelize.define('Utilisateur', {
    IM: DataTypes.INTEGER,
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    image: DataTypes.STRING,
    email: DataTypes.STRING,
    tel: DataTypes.STRING,
    mpd: DataTypes.STRING,
    fonction: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
    IdDIRECTION: DataTypes.INTEGER
  }, {});
  Utilisateur.associate = function(models) {
    // associations can be defined here
    models.Utilisateur.belongsTo(models.Direction, {
      foreignKey: 'IdDIRECTION',
      as: 'utilisateur'
    });
    models.Utilisateur.hasMany(models.Demande);
  };
  return Utilisateur;
};
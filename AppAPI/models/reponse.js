'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reponse = sequelize.define('Reponse', {
    utilisateurId: {
      type: DataTypes.INTEGER,
      references: {
    		model: 'Demande',
    		key: 'id'
    	}
    },
    demandeId: {
      type: DataTypes.INTEGER,
      references:{
    		model: 'Utilisateur',
    		key: 'id'
      }
    },
    contenueRep: DataTypes.STRING
  }, {});
  Reponse.associate = function(models) {
    // associations can be defined here
    models.Utilisateur.belongsToMany(models.Demande, {
    	through: models.Reponse,
    	foreignKey: 'utilisateurId',
    	otherKey: 'demandeId',
    });
    models.Demande.belongsToMany(models.Utilisateur, {
    	through: models.Reponse,
    	foreignKey: 'demandeId',
    	otherKey: 'utilisateurId'
    });
    models.Reponse.belongsTo(models.Utilisateur, {
    	foreignKey: 'utilisateurId',
    	as: 'utilisateur',
    });
    models.Reponse.belongsTo(models.Demande, {
    	foreignKey: 'demandeId',
    	as: 'demande',
    });
  };
  return Reponse;
};
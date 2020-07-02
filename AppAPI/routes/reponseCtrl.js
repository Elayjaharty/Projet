// Imports
var models = require('../models');
var outilsJwt = require('../outils/outilsJwt');
var asyncLib = require('async');

//  Constantes
const LIMITE_CONTENUEREP = 5;
const MAX_CONTENUEREP = 300;

// Routes
module.exports = {
	createReponse: function(req, res) {
		//Prendre l'autorisation
        var autorisation = req.headers['authorization'];
        var utilisateurId = outilsJwt.getutilisateurId(autorisation);

        //Paramètre
        var contenueRep = req.body.contenueRep;
        var demandeId = req.params.demandeId;

        if (contenueRep == null) {
        	return res.status(400).json({ 'error': 'Paramètre manquant' });
        }

        if (contenueRep.length <= LIMITE_CONTENUEREP || contenueRep.length >= MAX_CONTENUEREP) {
        	return res.status(400).json({ 'error': 'invalide contenue' });
        }

        if (demandeId <= 0) {
        	return res.status(400).json({ 'error': 'Paramètre invalide' });
        }

        asyncLib.waterfall([
        	function(fait) {
       			models.Utilisateur.findOne({
        			attributes: [ 'id' ],
        			where: { id: utilisateurId }
        		})
        		.then(function(utilisateurFound) {
        			fait(null, utilisateurFound);
        		})
        		.catch(function(err) {
        			return res.status(500).json({ 'error': 'nous ne pouvons pas verifier l\'existance de l\'utilisateur' });
        		});
        	},
        	function(utilisateurFound, fait) {
        		if (utilisateurFound) {
        			models.Reponse.create({
        				contenueRep : contenueRep,
        				utilisateurId : utilisateurFound.id,
        				demandeId : demandeId
        			})
        			.then(function(newReponse) {
        				fait(newReponse);
        			});
        		} else {
        			res.status(404).json({ 'error': 'Utilisateur introuvable' });
        		}
        	}
        ], function(newReponse) {
        	if (newReponse) {
        		return res.status(201).json(newReponse);
        	} else {
        		return res.status(500).json({ 'error': 'impossible de poster le reponse' });
        	}
        });
	},
	updateReponse: function(req, res) {
		//Prendre l'autorisation
        var autorisation = req.headers['authorization'];
        var utilisateurId = outilsJwt.getutilisateurId(autorisation);

        //Paramètre
        var contenueRep = req.body.contenueRep;
        var demandeId = req.params.demandeId;
        var reponseId = req.params.reponseId;

        asyncLib.waterfall([
        	function(fait) {
        		models.Demande.findOne({
        			attributes: [ 'id' ],
        			where: { id: demandeId }
        		})
        		.then(function(demandeFound) {
        			fait(null, demandeFound);
        		})
        		.catch(function(err) {
        			return res.status(500).json({ 'error': 'nous ne pouvons pas verifier l\'existance du message' });
        		});
        	},
        	function(demandeFound, fait) {
        		if (demandeFound) {
        		models.Utilisateur.findOne({
        			attributes: [ 'id' ],
        			where: { id: utilisateurId }
        		})
        		.then(function(utilisateurFound) {
        			fait(null,demandeFound, utilisateurFound);
        		})
        		.catch(function(err) {
        			return res.status(500).json({ 'error': 'nous ne pouvons pas verifier l\'existance de l\'utilisateur' });
        		});
        		} else {
        			res.status(404).json({ 'error': 'Demande introuvable' });
        		}
        	},
        	function(demandeFound, utilisateurFound, fait) {
        		if (utilisateurFound) {
        			models.Reponse.findOne({
        				attributes: [ 'id' ],        				
        				where: { id: reponseId }
        			})
        			.then(function(ReponseFound) {
        				fait(null, demandeFound, utilisateurFound, ReponseFound);
        			})
        			.catch(function(err) {
        				return res.status(500).json({ 'error': 'nous ne pouvons pas verifier l\'existance de la rèponse' });
        			});
        		} else {
        			res.status(404).json({ 'error': 'Utilisateur introuvable' });
        		}
        	},
        	function(demandeFound, utilisateurFound, ReponseFound, fait) {
        		if (ReponseFound) {
        			reponseFound.update({
        				contenueRep :  (contenueRep ? contenueRep : ReponseFound.contenueRep)
        			})
        			.then(function(ReponseFound) {
        				fait(ReponseFound);
        			}).catch(function(err) {
        				return res.status(500).json({ 'error': 'nous ne pouvons pas verifier l\'existance de la rèponse' });
        			});
        		} else {
        			res.status(404).json({ 'error': 'Message introuvable' });
        		}
        	}
        ], function(ReponseFound) {
        	if (ReponseFound) {
        		return res.status(201).json(ReponseFound);
        	} else {
        		return res.status(500).json({ 'error': 'impossible de modifier la reponse' });
        	}
        });
	},
	deleteReponse: function(req, res) {

		//Prendre l'autorisation
        var autorisation = req.headers['authorization'];
        var utilisateurId = outilsJwt.getutilisateurId(autorisation);

        //Paramètre
        var demandeId = req.params.demandeId;
        var reponseId = req.params.reponseId;

        asyncLib.waterfall([
        	function(fait) {
        		models.Demande.findOne({
        			attributes: [ 'id' ],
        			where: { id: demandeId }
        		})
        		.then(function(demandeFound) {
        			fait(null, demandeFound);
        		})
        		.catch(function(err) {
        			return res.status(500).json({ 'error': 'nous ne pouvons pas verifier l\'existance du message' });
        		});
        	},
        	function(demandeFound, fait) {
        		if (demandeFound) {
        		models.Utilisateur.findOne({
        			attributes: [ 'id' ],
        			where: { id: utilisateurId }
        		})
        		.then(function(utilisateurFound) {
        			fait(null,demandeFound, utilisateurFound);
        		})
        		.catch(function(err) {
        			return res.status(500).json({ 'error': 'nous ne pouvons pas verifier l\'existance de l\'utilisateur' });
        		});
        		} else {
        			res.status(404).json({ 'error': 'Demande introuvable' });
        		}
        	},
        	function(demandeFound, utilisateurFound, fait) {
        		if (utilisateurFound) {
        			models.Reponse.findOne({
        				attributes: [ 'id' ],        				
        				where: { id: reponseId }
        			})
        			.then(function(ReponseFound) {
        				fait(null, demandeFound, utilisateurFound, ReponseFound);
        			})
        			.catch(function(err) {
        				return res.status(500).json({ 'error': 'nous ne pouvons pas verifier l\'existance de la rèponse' });
        			});
        		} else {
        			res.status(404).json({ 'error': 'Utilisateur introuvable' });
        		}
        	},
        	function(demandeFound, utilisateurFound, ReponseFound, fait) {
        		if (ReponseFound) {
        			models.Reponse.destroy({ 
        				where: { id: ReponseFound.id }
        			})
        			.then(function(ReponseFound) {
        				fait(ReponseFound);
        			}).catch(function(err) {
        				return res.status(500).json({ 'error': 'nous ne pouvons pas verifier l\'existance de la rèponse' });
        			});
        		} else {
        			res.status(404).json({ 'error': 'Message introuvable' });
        		}
        	}
        ], function(ReponseFound) {
        	if (ReponseFound) {
        		return res.status(201).json(ReponseFound);
        	} else {
        		return res.status(500).json({ 'error': 'impossible de modifier la reponse' });
        	}
        });
	}
}
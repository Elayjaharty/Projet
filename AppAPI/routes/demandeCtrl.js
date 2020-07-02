// Imports
var models = require('../models');
var outilsJwt = require('../outils/outilsJwt');
var asyncLib = require('async');

// Constants
const LIMITE_TITRE = 3;
const MAX_TITRE = 50;
const LIMITE_CONTENUE = 5;
const MAX_CONTENUE = 300;

// Routes
module.exports = {
        createDemande: function(req, res) {
        //Prendre l'autorisation
        var autorisation = req.headers['authorization'];
        var utilisateurId = outilsJwt.getutilisateurId(autorisation);

        //Paramètre
        var titre = req.body.titre;
        var contenue = req.body.contenue;
        var refDm = req.body.refDm;

        if (titre == null || contenue == null || refDm == null ) {
        	return res.status(400).json({ 'error': 'Paramètre manquant' });
        }

        if (titre.length <= LIMITE_TITRE || titre.length >= MAX_TITRE) {
        	return res.status(400).json({ 'error': 'invalide titre' });
        }

        if (contenue.length <= LIMITE_CONTENUE || contenue.length >= MAX_CONTENUE) {
        	return res.status(400).json({ 'error': 'invalide contenue' });
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
        			models.Demande.create({
        				titre : titre,
        				contenue : contenue,
        				refDm : refDm,
        				UtilisateurId : utilisateurFound.id
        			})
        			.then(function(newDemande) {
        				fait(newDemande);
        			});
        		} else {
        			res.status(404).json({ 'error': 'L\'utilisateur est introuvable' });
        		}
        	},
        ], function(newDemande) {
        	if (newDemande) {
        		return res.status(201).json(newDemande);
        	} else {
        		return res.status(500).json({ 'error': 'impossible de poster le message' });
        	}
        });
        },
	listDemandes: function(req, res) {
		var fields = req.query.fields;
		var limit = parseInt(req.query.limit);
		var offset = parseInt(req.query.offset);
		var order = req.query.order;

		models.Demande.findAll({
			order: [(order != null) ? order.split(':') : ['titre', 'ASC']],
			attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
			limit: (!isNaN(limit)) ? limit : null,
			offset: (!isNaN(offset)) ? offset : null,
			include: [{
				model: models.Utilisateur,
				attributes: [ 'IM', 'nom', 'prenom', 'email' ]
			}]
		})
		.then(function(demandes) {
			if (demandes) {
				res.status(200).json(demandes);
			} else {
				res.status(404).json({ 'error': 'message non trouver' });
			}
		}).catch(function(err) {
			console.log(err);
			res.status(500).json({ 'error': 'fields invalide' });
		})
	},
        listDemandesProfil: function(req, res) {
        //Prendre l'autorisation
        var autorisation = req.headers['authorization'];
        var utilisateurId = outilsJwt.getutilisateurId(autorisation);

        //Paramêtre
        var fields = req.query.fields;
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var order = req.query.order;


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
                                models.Demande.findAll({
                                        order: [(order != null) ? order.split(':') : ['titre', 'ASC']],
                                        attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
                                        limit: (!isNaN(limit)) ? limit : null,
                                        offset: (!isNaN(offset)) ? offset : null,
                                        include: [{
                                                model: models.Utilisateur,
                                                attributes: [ 'IM', 'nom', 'prenom', 'email' ]
                                        }],
                                        where: { utilisateurId: utilisateurId }
                                })
                                .then(function(demandes) {
                                        if (demandes) {
                                                res.status(200).json(demandes);
                                        } else {
                                                res.status(404).json({ 'error': 'message non trouver' });
                                        }
                                }).catch(function(err) {
                                        console.log(err);
                                        res.status(500).json({ 'error': 'fields invalide' });
                                })
                        } else {
                                res.status(404).json({ 'error': 'L\'utilisateur est introuvable' });
                        }
                },
        ], function(demandes) {
                if (demandes) {
                        return res.status(201).json(demandes);
                } else {
                        return res.status(500).json({ 'error': 'impossible de poster le message' });
                }
        });
        }
}
// Imports
var bcrypt = require('bcrypt');
var outilsJwt = require('../outils/outilsJwt');
var models = require('../models');
const { where } = require('sequelize');

//constante
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

// Routes
module.exports = {
    GetUtilisateurs: function(req, res, next) {
        models.Utilisateur.findAll({})
        .then(function(utilisateurs) {
            if (utilisateurs) {
                res.status(200).json(utilisateurs);
            } else {
                res.status(404).json({ 'error': 'utilisateurs non trouver' });
            }
        })
        .catch(function(err) {
            res.status(500).json({ 'error': 'fields invalide' });
        });
    },
    registre: function(req, res) { 
        //Paramètre
        var IM = req.body.IM;
        var nom = req.body.nom;
        var prenom = req.body.prenom;
        var email = req.body.email;
        var tel = req.body.tel;
        var mpd = req.body.mpd;
        var fonction = req.body.fonction;
        var admin = req.body.admin;
        var dir = req.body.dir;

        if (IM == null || nom == null || prenom == null || email == null || mpd == null ) {
            return res.status(400).json({ 'error': 'paramètres manquant!!'});
        }

        if (admin == null) {
            admin = 0;
        }
        
        if (IM.length >= 7 || IM.length <= 5) {
            return res.status(400).json({'error': 'La longeur de votre IM doit être 5ntre 5 et 22'})
        }

        if (nom.length >= 23 || nom.length <= 4) {
            return res.status(400).json({'error': 'La longeur de votre nom doit être entre 5 et 22'})
        }

        if (prenom.length >= 41 || prenom.length <= 2) {
            return res.status(400).json({'error': 'La longeur de votre nom doit être entre 3 et 40'})
        }

        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ 'error': 'L\'e-mail est invalide' })
        }

        if (!PASSWORD_REGEX.test(mpd)) {
            return res.status(400).json({ 'error': 'Expression du mot de passe. Le mot de passe doit comprendre entre 4 et 8 chiffres et inclure au moins un chiffre numérique' })
        }


        //Existance Verificaion

        models.Utilisateur.findOne({
            attributes: ['email'],
            where: { email: email }
        })
        .then(function(utilisateurFound) {
            if (!utilisateurFound){
                bcrypt.hash(mpd, 5, function( err, bcryptedPassword ) {
                    var newUtil = models.Utilisateur.create({
                        IM: IM,
                        nom: nom,
                        prenom: prenom,
                        email: email,
                        tel: tel,
                        mpd: bcryptedPassword,
                        fonction: fonction,
                        admin: admin,
                        DirectionId: dir
                    })
                    .then(function(newUtil) {
                        return res.status(201).json({
                            'utilisateurId': newUtil.id,
                            'IM' : newUtil.IM
                        })
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'nous ne pouvons pas enregistrer l\'utilisateur'});
                    });
                }); 
            } else {
                return res.status(409).json({ 'error': 'utilisateur existant'});
            } 
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'nous ne pouvons pas verifier l\'existance de l\'utilisateur'});
        });
    },
    login: function(req, res) {

        //Paramètre
        var email = req.body.email;
        var mpd = req.body.mpd;
        var dir = req.body.dir;
        if (email == null || mpd == null){
            return res.status(400).json({'error': 'Paramètre manquant!!'});
        }
        //Existance Verificaion
        models.Utilisateur.findOne({
            attributes: ['id', 'mpd', 'DirectionId'],
            where: { email: email, DirectionId: dir }
        })
        .then(function(utilisateurFound) { 
            if (utilisateurFound) {
                if ( utilisateurFound.DirectionId == dir) {
                    bcrypt.compare(mpd, utilisateurFound.mpd, function( errBcrypt, resBcrypt ) {
                        if(resBcrypt) {
                            return res.status(200).json({
                                'utilisateurId': utilisateurFound.id,
                                'direction': utilisateurFound.DirectionId,
                                'token':  outilsJwt.generateTokenForUser(utilisateurFound)
                            });
                        } else  {
                            return res.status(403).json({ 'error': 'mots de passe invalide'});
                        }
                    });
                } else {
                    return res.status(404).json({ 'error': 'l\'utilisateur n\'existe pas dans cette direction'});
                }
            } else {
                return res.status(404).json({ 'error': 'Utilisateur non trouver!! Essayer une autre direction'});
            }
        })
        .catch(function(err) {
            return res.status(500).json({ 'error': 'nous ne pouvons pas verifier l\'existance de l\'utilisateur'});
        });

    },
    GetUtilisateurProfile: function(req, res) {
        //Prendre l'autorisation
        var autorisation = req.headers['authorization'];
        var utilisateurId = outilsJwt.getutilisateurId(autorisation);

        if (utilisateurId <0) 
            return res.status(400).json({ 'error': 'mauvais token' });

        models.Utilisateur.findOne({
            attributes: ['id', 'IM', 'nom', 'prenom', 'email', 'tel', 'fonction', 'admin' ],
            where: { id: utilisateurId }
        }).then(function(utilisateur) { 
            if (utilisateur) {
                res.status(201).json(utilisateur);
            } else {
                res.status(404).json({ 'error': 'l\'utilisateur pas trouvé'});
            }
        }).catch(function(err) {
            res.status(500).json({ 'error': 'nous ne pouvons pas verifier l\'existance de l\'utilisateur' });
        });
    },  
    updateUtilisateurProfile: function(req, res) {
        // Prendre l'autorisation
        var autorisation = req.headers['authorization'];
        var utilisateurId = outilsJwt.getutilisateurId(autorisation);

        // Paramêtre
        var IM = req.body.IM;
        var nom = req.body.nom;
        var prenom = req.body.prenom;
        var email = req.body.email;
        var tel = req.body.tel;

        asyncLib.waterfall([
            function(fait) {
                models.Utilisateur.findOne({
                    attributes: ['id','IM', 'nom', 'prenom', 'email', 'tel'],
                    where: { id: utilisateurId }
                }).then(function (utilisateurFound) {
                    fait(null, utilisateurFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'l\'utilisateur est inverifiable' });
                });
            },
            function(utilisateurFound, fait) {
                if(utilisateurFound) {
                    utilisateurFound.update({
                        IM: (IM ? IM : utilisateurFound.IM),
                        nom: (nom ? nom : utilisateurFound.nom),
                        prenom: (prenom ? prenom : utilisateurFound.prenom),
                        email: (email ? email : utilisateurFound.email),
                        tel: (tel ? tel : utilisateurFound.tel)
                    }).then(function() {
                        fait(utilisateurFound);
                    }).catch(function(err) {
                        res.status(500).json({ 'error': 'l\'utilisateur ne peut pas être modifié' });
                    });
                } else {
                    res.status(404).json({ 'error': 'l\'utilisateur pas trouvé' });
                }
            },
        ], function(utilisateurFound) {
            if (utilisateurFound) {
                return res.status(201).json(utilisateurFound);
            } else {
                return res.status(500).json({ 'error': 'le profile de l\'utilisateur est impossible à modifier' });
            }
        });
    },
    updateMpdProfile: function(req, res) {
        // Prendre l'autorisation
        var autorisation = req.headers['authorization'];
        var utilisateurId = outilsJwt.getutilisateurId(autorisation);

        // Paramêtre
        var anMpd = req.body.anMpd;
        var newMpd = req.body.newMpd;

        asyncLib.waterfall([
            function(fait) {
                models.Utilisateur.findOne({
                    attributes: ['id', 'mpd'],
                    where: { id: utilisateurId }
                }).then(function (utilisateurTrouve){
                    fait(null, utilisateurTrouve);
                }).catch(function(err) {
                    return res.status(500).json({ 'error': 'l\'utilisateur est inverifiable' });
                });
            },
            function (utilisateurTrouve, fait) {
                if(utilisateurTrouve) {
                    bcrypt.compare(anMpd, utilisateurTrouve.mpd, function( errBcrypt, resBcrypt ) {
                        if(resBcrypt) {
                            bcrypt.hash(newMpd, 5, function( err, bcryptedPassword ) {
                                utilisateurTrouve.update({
                                    mpd: bcryptedPassword
                                }).then(function(){
                                    fait(utilisateurTrouve);
                                }).catch(function(err) {
                                    res.status(500).json({ 'error': 'Vôtre mot de passe ne peut pas être modifié' });
                                });
                            });
                        } else {
                            return res.status(403).json({ 'error': 'mots de passe invalide'});
                        }
                    });
                }
            }
        ])
    }
}
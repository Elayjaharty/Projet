// Imports
var express = require('express');
var utilisateurCtrl = require('./routes/utilisateurCtrl');
var demandeCtrl = require('./routes/demandeCtrl');
var reponseCtrl = require('./routes/reponseCtrl');

//Router
exports.router = (function() {
    var routerApi = express.Router();

    // utilisateur routes
    routerApi.route('/login/').post(utilisateurCtrl.login);
    routerApi.route('/registre/').post(utilisateurCtrl.registre);
    routerApi.route('/utilisateurs/').get(utilisateurCtrl.GetUtilisateurs);
    routerApi.route('/utilisateur/in/').get(utilisateurCtrl.GetUtilisateurProfile);
    routerApi.route('/utilisateur/in/').put(utilisateurCtrl.updateUtilisateurProfile);
    routerApi.route('/utilisateur/mdp/').put(utilisateurCtrl.updateMpdProfile);

    // demandes routes
    routerApi.route('/demande/nouveau/').post(demandeCtrl.createDemande);
    routerApi.route('/demande/liste/').get(demandeCtrl.listDemandes);
    routerApi.route('/utilisateur/demande/liste/').get(demandeCtrl.listDemandesProfil);

    // réponse routes
    routerApi.route('/demande/:demandeId/reponse/').post(reponseCtrl.createReponse); 
    routerApi.route('/demande/:demandeId/reponse/:reponseId/').put(reponseCtrl.updateReponse); 
    routerApi.route('/demande/:demandeId/reponse/:reponseId/supprimer/').put(reponseCtrl.deleteReponse); 

    return routerApi; 
})();
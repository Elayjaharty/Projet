//Imports
var jwt = require('jsonwebtoken');
 
const JWT_SIGN= '65sdxc51EEssd4dhrz5ythe55TEs1s65s5gs54r4s5gs4s4qs5555sO'

//Exported fonction
module.exports = {
    generateTokenForUser: function(utilisateurData) {
        return jwt.sign({
            utilisateurId: utilisateurData.id,
            admin: utilisateurData.admin
        },
        JWT_SIGN,
        {
            expiresIn: '24h'
        })
    },
    parseAutorisation: function(authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    getutilisateurId: function(authorization) {
        var utilisateurId = -1;
        var token = module.exports.parseAutorisation(authorization);
        if (token != null) {
            try {
                var jwtToken = jwt.verify(token, JWT_SIGN);
                if (jwtToken != null) 
                    utilisateurId = jwtToken.utilisateurId;
            } catch(err) { }
        }
        return utilisateurId;
    }
}
//Imports
var express = require('express');
var bodyparser = require('body-parser');
var routerApi = require('./routerApi').router;
var cors = require('cors');
const db = require('./models');
var models = require('./models');

//Instanciation server  
var appserver = express();

//Configuration Body Parser
appserver.use(bodyparser.urlencoded({ extended: true }));
appserver.use(bodyparser.json());

//Cross Origine Ressourse Sharing
appserver.use(cors());

//Configure
appserver.get('/', function (req, res) {
    res.setHeader('Contient-type', 'text/html');
    res.status(200).send('<h1>Bienvenu dans le server</h1>');
});

appserver.use('/', routerApi);

db.sequelize.sync({force: true}).then(() =>{
    initial();
});

// Launcher server
appserver.listen(8080, function() {
    console.log('Server en marche');
});

function initial() {
    const DGA = models.Direction.create({
        id: 1,
        nomDir: "DGA"
    });
    
    const DGE = models.Direction.create({
        id: 2,
        nomDir: "DGE"
    });
    
    const DGPA = models.Direction.create({
        id: 3,
        nomDir: "DGPA"
    });

    const admin1 = models.Utilisateur.create({
        id: 1,
        IM: 999999,
        nom: "Admin",
        prenom: "Administrateur",
        email: "admin@gmail.com",
        tel: "0000000000",
        mpd: "$2b$05$CzlrWU5z2R8ZkhQmVP.tTOc73lDgCMvsYEF6Bd4HtkKxD7Vt40Hku",
        fonction: "Administrateur",
        admin: 1,
        IdDIRECTION: 1
    })

    const admin2 = models.Utilisateur.create({
        id: 2,
        IM: 999999,
        nom: "Admin",
        prenom: "Administrateur",
        email: "admin@gmail.com",
        tel: "0000000000",
        mpd: "$2b$05$CzlrWU5z2R8ZkhQmVP.tTOc73lDgCMvsYEF6Bd4HtkKxD7Vt40Hku",
        fonction: "Administrateur",
        admin: 1,
        IdDIRECTION: 2
    })

    const admin3 = models.Utilisateur.create({
        id: 3,
        IM: 999999,
        nom: "Admin",
        prenom: "Administrateur",
        email: "admin@gmail.com",
        tel: "0000000000",
        mpd: "$2b$05$CzlrWU5z2R8ZkhQmVP.tTOc73lDgCMvsYEF6Bd4HtkKxD7Vt40Hku",
        fonction: "Administrateur",
        admin: 1,
        IdDIRECTION: 3
    })
}
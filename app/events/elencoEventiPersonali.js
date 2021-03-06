const express = require('express');
const eventPublic = require('../collezioni/eventPublic');
const eventPersonal = require('../collezioni/eventPersonal');
const router = express.Router();
const eventsMap = require('./eventsMap.js');
var jwt = require('jsonwebtoken');

router.get("/:data", async (req, res) => {
	var str = req.params.data.split("-").join("/"); //Il parametro "data" deve essere parte dell'URI sopra indicato se si vuole accedere a questa proprietà.
    var eventsPers = [], eventsPub = [];
    var obj = {}, token = req.header("x-access-token");
	
	var user = "628343ba57afadf76947e95a"; //Utente di prova

    if(token != "") {
        //Eseguire la funzione verify, poi cercare gli eventi nel database
        eventsPers = await eventPersonal.find({organizzatoreID: user}); //Richiedi gli eventi personali per la data selezionata.
		eventsPers = eventsPers.filter(e => e.data.includes(str));
		eventsPub = await eventPublic.find({});
		eventsPub = eventsPub.filter(e => (e.partecipantiID.find(e => e == user) != undefined || e.organizzatoreID == user) && e.data.includes(str)); //Cambiare l'id del partecipante al momento del merge con il modulo di autenticazione.
	} else {
        res.status(401).json({"error": "Non è stato possibile accedere alla risorsa richiesta perché l'utente non è autenticato."});
    }

    if(eventsPers.length > 0 || eventsPub.length > 0) {
        eventsPers = eventsMap.map(eventsPers, "layoutPersonale.html", token);
        eventsPub = eventsMap.map(eventsPub, "layoutPubblico.html", token);
        eventsPub.forEach(e => eventsPers.push(e));
        obj.eventi = eventsPers;
        obj.data = str;
        res.status(200).json(obj);
    } else {
        res.status(404).json({"error": "Non esiste alcun evento programmato per la giornata selezionata."});
    }
});

module.exports = router;
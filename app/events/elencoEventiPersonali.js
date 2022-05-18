const express = require('express');
const eventPublic = require('../collezioni/eventPersonal');
const router = express.Router();
const eventsMap = require('./eventsMap.js');

router.get("/:data", (req, res) => {
	var str = req.params.data.split("-").join("/");
	var events = eventPublic.find({data: str});
	if(events.length > 0) {
		res.status(200).json(eventsMap.map(events, "layoutPersonale.html"));
	} else {
		res.status(404).json({"Errore": "Nessun evento legato alla risrsa richiesta"});
	}
});

module.exports = router;
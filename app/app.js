var personalEvents = require("./events/elencoEventiPersonali.js"), personalList = require('./events/listaEventiPersonali.js');
var express = require('express');
var path = require('path');
var app = express();

app.use("/", express.static("static"));

app.get("/static", (req, res) => {
    res.status(200).sendFile(path.resolve("./index.html"));
});

app.use("/api/v1/GiorniCalendarioPersonale", personalEvents);
app.use("/api/v1/EventiPersonali", personalList);

/* Default 404 handler */
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});

module.exports = app;
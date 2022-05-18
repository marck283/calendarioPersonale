var express = require('express');
var path = require('path');
var app = express();

app.use("/", express.static("static"));

app.get("/static", (req, res) => {
    res.status(200).sendFile(path.resolve("./index.html"));
});

/* Default 404 handler */
app.use((req, res) => {
    res.status(404);
    res.json({ error: 'Not found' });
});

module.exports = app;
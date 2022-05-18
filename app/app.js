var express = require('express');
var path = require('path');
var app = express();

app.get("/static", (req, res) => {
    res.status(200).sendFile(path.resolve("./index.html"));
});
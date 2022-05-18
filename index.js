var app = require('./app/app.js'), mongoose = require('mongoose');
require('dotenv').config();

app.locals.db = mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
        console.log("Application listening on port " + port);
    });
});

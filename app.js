var express = require('express');

var app = express();

var apiController = require('./controllers/api');
apiController(app);

app.listen(3000);
console.log('App running on http://localhost:3000');

module.exports = app;
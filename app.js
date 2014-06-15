var express = require('express');
var db = require('./lib/db');

var app = express();

db.loadModels('app', 'activity');

var apiController = require('./controllers/api');
apiController(app);

app.listen(3000);
console.log('App running on http://localhost:3000');

module.exports = app;
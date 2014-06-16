var express = require('express'),
	db = require('./lib/db'),
	bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

db.loadModels('app', 'activity');

var apiController = require('./controllers/api');
apiController(app);

app.listen(3000);
console.log('App running on http://localhost:3000');

module.exports = app;
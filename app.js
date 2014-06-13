var express = require('express');

var app = express();

app.get('/api/v1/status', function (req, res) {
	res.send({status:'ok'});
});

app.listen(3000);
console.log('App running on http://localhost:3000');

module.exports = app;
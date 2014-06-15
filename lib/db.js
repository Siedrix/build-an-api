'use strict';
var _ = require('underscore'),
	conf = require('./../conf'),
	mongoose = require('mongoose');

console.log('connect with db', conf.mongo.db);

var conn = mongoose.connection;
mongoose.set('debug', !!conf.mongoDebug);
conn.on('error', function () {
	return console.error.bind(console, '[mongo]: ');
});
conn.once('open', function () {
	console.log('Mongo connected to ' + conf.mongoUrl);
});

mongoose.connect('mongodb://localhost/' + conf.mongo.db);

mongoose.loadModels = function () {
	var models = _.toArray(arguments);

	models.forEach(function (model) {
		require('../models/' + model);
	});
};

module.exports = mongoose;
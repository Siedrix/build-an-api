'use strict';
var _ = require('underscore'),
	conf = require('./../conf'),
	mongoose = require('mongoose');

console.log('connect with db', conf.mongo.db);

mongoose.connect('mongodb://localhost/' + conf.mongo.db);

mongoose.loadModels = function () {
	var models = _.toArray(arguments);

	models.forEach(function (model) {
		require('../models/' + model);
	});
};

module.exports = mongoose;
var db = require('../lib/db'),
	hat = require('hat'),
	schema = db.Schema;

var appSchema = schema({
	name  : {type : String, require: true},
	token : {type : String, default: function () {
		return  hat(Math.pow(2,8));
	}}
});

var App = db.model('app', appSchema);

module.exports = App;
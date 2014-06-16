var db = require('../lib/db'),
	hat = require('hat'),
	schema = db.Schema;

var activitySchema = schema({
	title  : {type : String, require: true},
	description : {type : String},
	app : { type: schema.Types.ObjectId, ref: 'app' }
});

var Activity = db.model('activity', activitySchema);

module.exports = Activity;
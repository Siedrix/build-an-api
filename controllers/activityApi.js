var controller = require('stackers'),
	db = require('../lib/db'),
	_ = require('underscore');

var Activity = db.model('activity');
var middlewareUtils = require('../middlewares/api');

var activityApiController = controller({
	path : 'activity'
});

activityApiController.param('activity', function (activityId, done) {
	Activity.findOne({_id: db.Types.ObjectId(activityId)})
	.exec(done);
});

activityApiController.get('/', function (req, res) {
	Activity.find({}, function(err, activities){
		if(err){return res.sendError(500, err);}

		res.send(activities);
	});
});

activityApiController.post('/', middlewareUtils.ensureApp, function (req, res) {
	var activity = new Activity(req.body);

	activity.save(function(err){
		if(err){return res.send(500,err);}

		res.send(activity);
	});
});

activityApiController.patch('/:activity', middlewareUtils.ensureApp, function (req, res) {
	var activity = res.data.activity;

	if(activity.app._id !== req.body.app._id){
		delete req.body.app;

		_.each(req.body, function(value, key){
			activity[key] = value;
		});

		activity.save(function(err){
			if(err){return res.send(500,err);}

			res.send(activity);
		});
	}else{
		res.sendError(403, 'Forbidden');
	}
});

activityApiController.del('/:activity', middlewareUtils.ensureApp, function (req, res) {
	console.log('Hi, delete', res.data.activity.title, ' please');

	var activity = res.data.activity;

	if(activity.app._id !== req.body.app._id){
		activity.remove(function(err){
			if(err){return res.send(500,err);}

			res.send({
				success : true,
				status : 'deleted'
			});
		});
	}else{
		res.sendError(403, 'Forbidden');
	}
});

module.exports = activityApiController;
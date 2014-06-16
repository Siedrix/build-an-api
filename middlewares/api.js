var db = require('../lib/db');

var App = db.model('app')

var apiMiddleware = {};

apiMiddleware.ensureApp = function (req, res, next) {
	var appToken = req.headers['app-token'];

	if(appToken){
		App.findOne({token:appToken}, function(err, app){
			if(err){return res.sendError(500, err);}
			if(!app){return res.sendError(403, 'App token required');}

			req.body.app = app;

			next();
		});
	}else{
		res.sendError(403, 'App token required');
	}
};

module.exports = apiMiddleware;
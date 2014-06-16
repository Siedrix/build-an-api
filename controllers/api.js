var controller = require('stackers');

var apiController = controller({
	path : '/api/v1/'
});

apiController.get('/status', function (req, res) {
	res.send({status:'ok'});
});

var activityApiController = require('./activityApi');
apiController.attach(activityApiController);

module.exports = apiController;
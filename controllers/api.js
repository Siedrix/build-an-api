var controller = require('stackers');

var apiController = controller({
	path : '/api/v1/'
});

apiController.get('/api/v1/status', function (req, res) {
	res.send({status:'ok'});
});

module.exports = apiController;
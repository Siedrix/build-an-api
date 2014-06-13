var controller = require('stackers');

var apiController = controller({
	path : '/api/v1/'
});

apiController.get('/status', function (req, res) {
	res.send({status:'ok'});
});

module.exports = apiController;
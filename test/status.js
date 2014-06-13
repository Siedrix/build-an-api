var request = require('supertest');
var app = require('../app');

describe('Simple api test', function(){
	describe('/api/v1/status 200, {status:"ok"}', function(){
		it('Should get {status:"ok"}', function(done){
			request(app)
			.get('/api/v1/status')
			.expect(200, {status:'ok'})
			.end(done);
		});
	});
});
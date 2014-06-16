var request = require('supertest'),
	app = require('../app'),
	chai    = require('chai');

var expect = chai.expect;
var activityId;

describe('Activity tests', function(){
	describe('GET /api/v1/activity', function(){
		it('Should get []', function(done){
			request(app)
			.get('/api/v1/activity/')
			.expect(200, [])
			.end(done);
		});
	});

	describe('POST /api/v1/activity', function(){
		it('Should get object with app info', function(done){
			var appData = require('../test-data/app');

			request(app)
			.post('/api/v1/activity/')
			.set('app-token', appData.token)
			.send({
				title: 'First',
				description : 'This is a description'
			})
			.expect(200)
			.end(function(err, res){
				if(err){return done(err);}

				var activity = res.body;
				activityId = activity._id;

				expect(activity.title).to.equal('First');
				expect(activity.description).to.equal('This is a description');
				expect(activity.app).to.equal(appData._id);
				done();
			});
		});

		it('Should get 403, app token required', function(done){
			request(app)
			.post('/api/v1/activity/')
			.send({
				title: 'First',
				description : 'This is a description'
			})
			.expect(403, {error: 'App token required'})
			.end(done);
		});
	});

	describe('GET /api/v1/activity', function(){
		it('Should get activities array with one activity', function(done){
			request(app)
			.get('/api/v1/activity/')
			.expect(200)
			.end(function(err, res){
				if(err){return done(err);}

				var activities = res.body;

				expect(activities.length).to.equal(1);
				done();
			});
		});
	});

	describe('PATCH /api/v1/activity/:id', function(){
		it('Should get activity with new data', function(done){
			var appData = require('../test-data/app');

			request(app)
			.patch('/api/v1/activity/' + activityId)
			.set('app-token', appData.token)
			.send({
				title: 'First(1)'
			})
			.expect(200)
			.end(function(err, res){
				if(err){return done(err);}

				var activity = res.body;

				expect(activity.title).to.equal('First(1)');
				done();
			});
		});

		it('Should get 403, app token required', function(done){
			request(app)
			.patch('/api/v1/activity/' + activityId)
			.send({
				title: 'First(1)'
			})
			.expect(403, {error: 'App token required'})
			.end(done);
		});
	});

	describe('DELETE /api/v1/activity/:id', function(){
		it('Should get 403, app token required', function(done){
			request(app)
			.del('/api/v1/activity/' + activityId)
			.expect(403, {error: 'App token required'})
			.end(done);
		});

		it('Should get 403, app token required', function(done){
			var appData = require('../test-data/app');

			request(app)
			.del('/api/v1/activity/' + activityId)
			.set('app-token', appData.token)
			.expect(200)
			.end(function(err, res){
				if(err){return done(err);}

				expect(res.body.status).to.equal('deleted');
				expect(res.body.success).to.equal(true);
				done();
			});
		});
	});

	describe('GET /api/v1/activity', function(){
		it('Should get []', function(done){
			request(app)
			.get('/api/v1/activity/')
			.expect(200, [])
			.end(done);
		});
	});
});
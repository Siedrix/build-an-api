var conf = require('../conf'),
	async = require('async');

if(conf.env !== 'test'){
	throw new Error('Invalid enviroment to run test');
}

var chai    = require('chai'),
	fs      = require('fs'),
	mkdirp = require('mkdirp');
	
mkdirp('./test-data');
var expect = chai.expect;

var db = require('../lib/db');

db.loadModels('app','activity');

var App = db.model('app');
var Activity = db.model('activity');

before(function (done) {
	async.parallel([
		function(done){App.remove({}, done);},
		function(done){Activity.remove({}, done);},
	], function(err){
		if(err){return done(err);}

		async.waterfall([
			function(done){
				App.create({name:'testApp', description:'This is a app for testing'}, function(err, app){
					fs.writeFileSync('./test-data/app.json', JSON.stringify( app.toJSON() ) );
					
					done(err);
				});
			}
		], done);
	});
});

describe('Set up', function () {
	it('Have one app', function(done){
		App.find({}, function(err, apps){
			if(err){return done(err);}
		
			expect(apps.length).to.equal(1);

			var app = apps[0];

			expect(app.name).to.equal('testApp');
			expect(app.token).exist;
			expect(app.token.length).to.equal(64);

			done();
		});
	});
});

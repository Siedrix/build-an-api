module.exports = function(grunt) {
	grunt.initConfig({
		watch: {
			scripts: {
				files: ['test/*.js', 'controllers/*.js', 'models/*.js', 'app.js'],
				tasks: ['env:test','mochaTest'],
				options: {
					spawn: true,
				}
			}
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'spec'
				},
				src: ['test/*.js']
			}
		},
		env : {
			dev : {
				NODE_ENV : 'development'
			},
			test : {
				NODE_ENV : 'test'
			}
		}
	});
 
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-watch');
 
	grunt.registerTask('default');
};
'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
	return connect.static(path.resolve(point));
};

module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: {
			build: {
				src: [".sass-cache"]
			}
		},

		swig: {
			development: {
				init: {
					root: "01_dev/swig/pages/",
					allowErrors: true,
					autoescape: true
				},
				cwd: "01_dev/swig/pages/",
				src: ['**/*.swig'],
				dest: "02_production/",
				generateSitemap: false,
				generateRobotstxt: false
			}
		},

		sass: {
			dist: {
				options: {
					style: 'expanded',
					noCache: true
				},
				files: [
					{
						expand: true,
						cwd: '01_dev/sass/',
						src: ['*.scss'],
						dest: '02_production/css/',
						ext: '.css'
					}
				]
			}
		},

		cssmin: {
			minify: {
				expand: true,
				cwd: '02_production/css/',
				src: ['*.css', '!*.min.css'],
				dest: '02_production/css/',
				ext: '.min.css'
			}
		},

		copy: {
			main: {
				files: [
					{
						expand: true,
						cwd: '01_dev/js',
						src: '**',
						dest: '02_production/js'
					}
				],
			},
		},

		uglify: {
			my_target: {
				files: [{
					expand: true,
					cwd: '01_dev/js/',
					src: ['**/*.js', '!**/*.min.js', '!*.min.js', '!lib/*.js'],
					dest: '02_production/js',
					ext: '.min.js'
				}]
			}
		},

		connect: {
			server: {
				options: {
					port: 8000,
					base: '02_production/',
					hostname: '*'
				}
			}
		},

		watch: {
			options: {
				dateFormat: function(time) {
					grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
					grunt.log.writeln('Waiting for new changes ...');
				},
				livereload: true
			},
			css: {
				files: '01_dev/sass/**/*',
				tasks: ['sass', 'cssmin'],
				options: {
					livereload: true,
				}
			},
			html: {
				files: '01_dev/swig/**/*.swig',
				tasks: ['swig'],
				options: {
					livereload: true,
				}
			},
			copy: {
				files: '01_dev/js/**/*',
				tasks: ['copy:main']
			},
			jsmin: {
				files: '01_dev/js/**/*.js',
				tasks: ['uglify']
			},
			json: {
				files: '01_dev/swig/pages/*.json',
				tasks: ['swig']
			}
		} // end watch
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-swig');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['watch']);		// this is the default command, use in terminal 'grunt'
	grunt.registerTask('dev', ['connect', 'swig', 'sass', 'uglify', 'cssmin', 'copy:main', 'clean', 'watch']);	// use 'grunt dev' for development
};

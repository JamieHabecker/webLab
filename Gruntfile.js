module.exports = function(grunt){
	grunt.initConfig({
		watch: {
			sass:{
				files:['sass/main.scss', 'sass/**/*.scss', 'sass/**/**/*.scss'],
				tasks:['compass']
			},
			javascript:{
				files:['public/globals/scripts/*.js'],
				tasks:['concat','uglify']
			},
			all :{
				files: ['index.html'],
				tasks:[]
			},
			jade: {
				files: ['views/*.jade'],
				tasks: ['jade']
			},
			options:{
			spawn:false,
			livereload:35730
			}
		},

		bump:{
  		files:['package.json']
		},
	    
		connect:{
			all:{
				options:{
					port:333,
					//hostname: "10.156.147.183" work
					hostname: "10.156.9.236",
					//hostname:"NG00207667",
					middleware: function(connect,options){
						return [
							require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
							connect.static(options.base)
						];
					}
				}
			}
		},

open: {
	all: {
		// Gets the port from the connect configuration
		path: 'http://localhost:<%= connect.all.options.port%>'
	}
},

//JSHint Options
jshint:{
	all: ['scripts/dev*.js']
},

//concat options
concat:{
	options: {
		separator: ';'
	},
	dist:{
		src: ['public/globals/vendor/jquery-1.10.2.js','public/globals/vendor/angular.js','public/globals/vendor/resource.js','public/globals/vendor/underscore.js','public/globals/vendor/ga.js','public/globals/scripts/*.js'], //Using mini match for your scripts to concatenate
		dest: 'public/globals/globals.js' //where to output the script
	}
},
		
compass: {
	options: {
		sassDir: 'sass/',
		cssDir: 'public/css/',
		imageDir: 'img/',
		outputStyle: 'compressed'
		//relativeAssets: false
		},
	server: {
		options: {
		debugInfo: true
		}
	}
},

//uglify options
uglify: {
    dest: {
      files: {
        'public/globals/globals.min.js': ['public/globals/globals.js']
      }
    }
},


jade: {
	compile: {
		options: {
		pretty: true,
		data: {
			debug: false
			}
		},
		files: {
			"index.html": ["views/index.jade"],
			"public/views/home.html": ["views/home.jade"],
			"public/views/dmvnow.html": ["views/dmvnow.jade"],
			"public/views/webservices.html": ["views/webservices.jade"],
			"public/views/mydmv.html": ["views/mydmv.jade"],
			"public/views/userForm.html": ["views/userForm.jade"],
			"public/views/contributors.html": ["views/contributors.jade"]
		}
	}
},  

/*
clean: {
            options: { force: true },
            release: ['../../contactus/']
        },
        copy: {            
            release: {
                files: {
                    '../../contactus/': ['scripts/contactUs.min.js','scripts/shims/*','css/*','views/*','views/directiveTemplates/*','index.html', 'img/*']
                }
            }
        },
*/
 usemin: {
            html: ['../../contactus/index.html']
    }
       
	
	
	
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-bump');
	

  //dev task
grunt.registerTask('server', [
		'compass',
		'jade',
	'concat',
	'uglify',
		'watch'
  ]);
  
  //build task
  grunt.registerTask('build', [
  'compass',
  'concat',
   'uglify',
    'clean',
    'copy',
    'usemin'
  ]);

};








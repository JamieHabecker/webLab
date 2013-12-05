module.exports = function(grunt){
	grunt.initConfig({


watch: {
			sass:{
				files:['../sass/**/*.scss','../../sass/**/**/*.scss', 'sass/*.scss'],
				tasks: ['compass']
			},
			all: {
				files: ['views/*html','views/includes/*html','scripts/dev/*.js'],
				tasks: []
			},
			jade: {
				files: ['jade/*.jade'],
				tasks: ['jade']
			},
			options:{
				spawn:false,
				livereload: true
			}
		},

bump:{
  files:['package.json']
},


connect:{
    all:{
        options:{
            port:330,
						hostname: "10.156.147.183",
            middleware: function(connect, options){
                 return [
                    require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
                    // Serve the project folder
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
				src: ['scripts/vendor/jquery-1.10.2.js','scripts/vendor/angular.js','scripts/vendor/resource.js','scripts/vendor/underscore.js','scripts/dev/*js','scripts/vendor/ga.js'], //Using mini match for your scripts to concatenate
                dest: 'scripts/SKE.js' //where to output the script
			}
		},
compass: {
      options: {
        sassDir: 'sass',
        cssDir: 'css',
        imageDir: 'img',
        outputStyle: 'compressed',
        importPath: '../../sass/',
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
        'scripts/ske.min.js': ['scripts/SKE.js']
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
					"index.html": ["jade/index.jade"],
					"views/skeMenu.html": ["jade/skeMenu.jade"],
					"views/exam10.html": ["jade/exam10.jade"],
					"views/complete.html": ["jade/complete.jade"]
				}
			}
		},

 clean: {
            options: { force: true },
            release: ['../../public/ske/']
        },
        copy: {            
            release: {
                files: {
                    '../../public/ske/': ['scripts/ske.min.js','scripts/shims/*','views/*','index.html', 'img/*']
                }
            }
        },
 usemin: {
            html: ['../../public/ske/index.html']
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
		'concat',
		'uglify',
		'jade',
		'connect',
		'open',
		'watch'
	]);


//build task
grunt.registerTask('build', [
	'compass',
	'concat',
	'uglify',
	'jade',
	'clean',
	'copy',
	'usemin'
]);
};


//Notes on getting Grunt up and running
/*http://rhumaric.com/2013/05/reloading-magic-with-grunt-and-livereload/ ----may be replaced by
 * grunt-contrib-watch, but couldn't get it to actually watch....Try again later to replace 
 * grunt-contrib-livereload and grunt-regarde with single grunt-contrib-watch
 */








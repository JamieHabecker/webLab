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

bump: {
	options: {
		files: ['package.json'],
		updateConfigs: [],
		commit: true,
		commitMessage: 'Release v%VERSION%',
		commitFiles: ['package.json'], // '-a' for all files
		createTag: true,
		tagName: 'v%VERSION%',
		tagMessage: 'Version %VERSION%',
		push: true,
		pushTo: 'origin master'
				//gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
			}
		},

connect:{
	all:{
		options:{
		port:330,
		//hostname: "10.156.147.183",
		hostname: "localhost",
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
				src: ['scripts/dev/*js'], //Using mini match for your scripts to concatenate
				dest: 'scripts/SKE.js' //where to output the script
			}
		},
compass: {
      options: {
        sassDir: 'sass',
        cssDir: 'css',
        imageDir: 'img',
        outputStyle: 'compressed',
        importPath: '../../sass/'
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
            release: ['../../public/releases/ske/']
        },
        copy: {            
            release: {
                files: {
                    '../../public/releases/ske/': ['scripts/ske.min.js','views/*.html','index.html', 'img/*']
                }
            }
        },
 usemin: {
            html: ['../../public/releases/ske/index.html']
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








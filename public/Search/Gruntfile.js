module.exports = function(grunt){
	grunt.initConfig({

		watch: {
			sass:{
				files:['../sass/**/*.scss','../../sass/**/**/*.scss', 'sass/*.scss'],
				tasks:['compass']
			},
			all: {
				files: ['views/*html','views/includes/*html','scripts/dev/*.js','../../public/css/*.css'],
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
					port:335,
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
				src: ['scripts/vendor/jquery-1.10.2.js','scripts/vendor/angular.js','scripts/vendor/resource.js','scripts/vendor/underscore.js','scripts/dev/*js','scripts/dev/forms/*js', 'scripts/dev/home/*js'], //Using mini match for your scripts to concatenate
                dest: 'scripts/contactUs.js' //where to output the script
			}
		},
		compass: {
			options: {
				sassDir: 'sass/',
				cssDir: 'css/',
				imageDir: '../../public/img',
				outputStyle: 'compressed',
				importPath: '../../sass/'
				//relativeAssets: false
			},
			server: {
				options: {
					debugInfo: true
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
			"views/dmvHome.html": ["jade/dmvHome.jade"],
      "views/search/searchResults.html":["jade/searchResults.jade"]
    }
  }
},  

		
//uglify options
uglify: {
    dest: {
      files: {
        'scripts/contactUs.min.js': ['scripts/contactUs.js']
      }
    }
},


 clean: {
            options: { force: true },
            release: ['y:/public/Search/']
        },
        copy: {            
            release: {
                files: {
                    'y:/public/Search/': ['scripts/contactUs.min.js','scripts/shims/*','search/css/*','views/*','views/directiveTemplates/*','views/includes/*','index.html', 'img/*', 'models/*']
                }
            }
        },
 usemin: {
            html: ['y:/public/Search/index.html']
    }
       
	
	
	
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-contrib-concat');
	//grunt.loadNpmTasks('grunt-contrib-livereload');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	//grunt.loadNpmTasks('grunt-regarde');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-bump');
	grunt.loadNpmTasks('grunt-contrib-jade');
	//grunt.renameTask('regarde', 'watch');
   

    //dev task
    grunt.registerTask('server', [
    'compass',
    'concat',
    'uglify',
    'jade',
    //'livereload-start',
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








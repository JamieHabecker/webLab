module.exports = function(grunt){
	grunt.initConfig({
	    
watch: {
    sass:{
        files: ['../../sass/**/*.scss','../../sass/**/**/*.scss', 'sass/*.scss'],
        tasks: ['compass']
    },
     all: {files: ['*.html', 'img/*.png,jpg,jpeg,gif,webp,svg', 'css/*.css']
      },
     jade: {
     	files:['jade/*.jade'],
     	 tasks: ['jade']
     },
     options:{
			spawn:false,
			livereload:true
     }
},
bump:{
  files:['package.json']
},
  
connect:{
    all:{
        options:{
            port:300,
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
        sassDir: 'sass',
        cssDir: 'css',
        imageDir: 'img',
        outputStyle: 'compressed',
        importPath: '../../sass/',
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
      "index.html": ["jade/index.jade"]
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
            release: ['v:/Forms/']
        },
        copy: {            
            release: {
                files: {
                    'v:/Forms/': ['scripts/contactUs.min.js','scripts/shims/*','css/*','views/*','views/directiveTemplates/*','views/includes/*','views/home/*','index.html', 'img/*', 'models/*']
                }
            }
        },
 usemin: {
            html: ['v:/Forms/index.html']
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
    'clean',
    'copy',
    'usemin'
  ]);

};
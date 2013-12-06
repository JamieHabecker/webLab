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
			port:300,
			hostname: "10.156.147.183",
			middleware: function(connect, options){
				return [
					require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
					connect.static(options.base)
				];
			}
		}
	}
},

	open:{
	all: {
		path: 'http://localhost:<%= connect.all.options.port%>'
    }
},

	jshint:{
	all: ['scripts/dev*.js']
},

	concat:{
	options: {
		separator: ';'
	},

	dist:{
		src:['scripts/dev/*.js'], //Using mini match for your scripts to concatenate
		dest:'scripts/contactUs.js' //where to output the script
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

	uglify: {
	dest: {
		files: {
			'scripts/contactUs.min.js': ['scripts/contactUs.js']
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
			"views/stepOne.html": ["jade/stepOne.jade"],
			"views/disclaimer.html" : ['jade/disclaimer.jade'],
			"views/stepTwo.html" : ['jade/stepTwo.jade'],
			"views/stepThree.html" : ['jade/stepThree.jade'],
			"views/stepFour.html" : ['jade/stepFour.jade'],
			"views/stepFive.html" : ['jade/stepFive.jade'],
			"views/stepSix.html" : ['jade/stepSix.jade'],
			"views/confirmation.html" : ['jade/confirmation.jade'],
			"views/complete.html" : ['jade/complete.jade']
		}
	}
},

	clean:{
	 options: { force: true },
	 release: ['../../public/OdometerFraud/']
 },

	copy:{
	release:{
		files: {
			'../../public/OdometerFraud/': ['scripts/contactUs.min.js','scripts/shims/*','views/*.html','index.html']
		}
	}
},

	usemin:{
		html:['../../public/OdometerFraud/index.html']
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
	'uglify',
	'clean',
	'copy',
	'usemin'
]);

};

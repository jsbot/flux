module.exports = function (grunt) {
var files = [
	'app/EventEmitter.js',
	'app/CartController.js',
	'app/CatalogController.js',
	'app/CartStore.js',
	'app/main.js',
];
	grunt.config.init({
		pkg: grunt.file.readJSON('package.json'),
		concat: {

			dist: {
				src: files,
				dest: 'app/app.js'
			}
		},
		ts: {
			options: {
				target: 'es5',
				//module: 'amd',
				sourceMap: false,
				compiler: './node_modules/typescript/bin/tsc'
			},
			files: {
				src: ['app/**/*.ts']

			}
		},
		clean: {
			source: ["!app/app.js","app/**/*.js"],
			dest: ["www"]
		},
		copy: {
			main: {
				files: [
					// includes files within path
					{
						expand: true,
						flatten: false,
						cwd:'app/',
						src: ['app.js', '**/*.html'], dest: 'www/'}
				]
			}
		}
	});


	grunt.loadNpmTasks('grunt-ts');
	grunt.loadNpmTasks('grunt-tslint');
	grunt.loadNpmTasks('grunt-tsd');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');






   grunt.registerTask('build', ['clean:dest','ts','concat','copy:main', 'clean:source']);

};
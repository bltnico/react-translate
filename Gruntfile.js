module.exports = function(grunt) {

    grunt.initConfig({

        uglify: {
           options: {
               mangle: false,
               report: 'gzip',
               banner: "/** React Translate \n * @author bltnico \n * @repository https://github.com/bltnico/react-translate \n */ \n"
           },
           target : {
               files : [{
                   expand: true,
                   cwd : 'dist/',
                   src: '*.js',
                   dest: 'dist/min/',
                   ext: '.js'
               }]
           }
       }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['uglify']);

};

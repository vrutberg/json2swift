module.exports = function(grunt) {
  grunt.initConfig({
    jasmine: {
      json2swift: {
        src: 'src/**/*.js',
        options: {
          specs: 'test/**/*test.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task.
  grunt.registerTask('default', 'jasmine');
};

module.exports = function(grunt) {

  //Initializing the configuration object
  grunt.initConfig({
      //--------------------INSTALL-DEPENDENCIES--------------//
      bower: {
        install: {
          options: {
            cleanBowerDir: true,
            verbose: true,
            layout: "byType"
          }
        }
      },
      //--------------------CSS-GENERATION--------------------//
      less: { 
        development: {
          options: {
            compress: true  //minifying the result
          },
          files: {
            //compiling frontend.less into frontend.css
            "./css/frontend.css":"./less/frontend.less",
            //compiling backend.less into backend.css
            "./css/backend.css":"./less/backend.less"
          }
        }
      },
      //--------------------MINIFICATION----------------------//
      concat: {
        options: {
          separator: ';'
        },
        js_frontend: {
          src: [
            './bower_components/jquery/jquery.js',
            './bower_components/bootstrap/dist/js/bootstrap.js',
            './js/script.js',
            './js/emailall.js'
          ],
          dest: './js/frontend.js'
        },
        js_backend: {
          src: [
            './bower_components/jquery/jquery.js',
            './bower_components/bootstrap/dist/js/bootstrap.js',
            './js/bracket-valid.js'
          ],
          dest: './js/backend.js'
        }
      },
      uglify: {
        options: {
          mangle: false
        },
        frontend: {
          files: {
            './js/frontend.min.js': './js/frontend.min.js'
          }
        },
        backend: {
          files: {
            './js/backend.min.js': './js/backend.min.js'
          }
        }
      },
      //--------------------TESTING---------------------------//
      phpunit: {
        classes: {
        },
        options: {
          colors: true
        }
      },
      qunit: {
        files: ['test/*.html']
      },
      //--------------------LINTING---------------------------//
      bootlint: {
        options: {
          stoponerror: false,
          relaxerror: []
        },
        files: ['', '']
      },
      jshint: {
        files: ['js/frontend.js','js/backend.js']
      },
      //--------------------FILE-GENERATE---------------------//
      curl: {
        'test/target/index.php' : 'http://localhost/tourney/index.php'
      },
      clean: ['test/target/*']

  });

  // Plugin loading
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-bootlint');
  grunt.loadNpmTasks('grunt-phplint');
  grunt.loadNpmTasks('grunt-phpunit');
  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-bower-task');

  // Task definition
  grunt.registerTask('default', ['']);
  grunt.registerTask('lint', ['jshint','curl','clean']);
  grunt.registerTask('minify', ['less', 'concat', 'uglify']);
};

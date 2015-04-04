module.exports = function(grunt) {

  //Initializing the configuration object
  var path = require('path');
  grunt.initConfig({
      //--------------------INSTALL-DEPENDENCIES--------------//
      bower: {
        install: {
          options: {
            cleanBowerDir: true,
            verbose: true,
            layout: function(type, component, source) {
              var newcomp = component;
              if(component == 'bootstrap' && source.indexOf('mixins/') > 0) {
                newcomp = 'bootstrap/mixins';
              }
              return path.join(type,newcomp);
            }
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
            './lib/jquery/jquery.js',
            './lib/bootstrap/js/bootstrap.js'
          ],
          dest: './js/frontend.js'
        },
        js_backend: {
          src: [
            './lib/jquery/jquery.js',
            './lib/bootstrap/dist/js/bootstrap.js',
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
        files: ['test/target/*.php']
      },
      jshint: {
        files: ['js/frontend.js','js/backend.js']
      },
      //--------------------TEST-FILE-GENERATE----------------//
      curl: {
        'test/target/index.php' : 'http://localhost/tourney/index.php'
      },
      clean: {
        test: ['test/target/*'],
        bower: ['bower_components','lib'],
        deploy: {
          src: ['/var/www/html/tourney/*'],
          options: { force: true }
        }
      },
      //--------------------DEPLOY----------------------------//
      copy: {
        deploy: {
          files: [{expand: true, src: ['**'], dest: '/var/www/html/tourney/'}]
        }
      }
  });

  // Plugin loading
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-bootlint');
  grunt.loadNpmTasks('grunt-phplint');
  grunt.loadNpmTasks('grunt-phpunit');
  grunt.loadNpmTasks('grunt-curl');

  // Task definition
  grunt.registerTask('default', ['minify', 'deploy']);
  grunt.registerTask('deploy', ['clean:deploy', 'copy:deploy']);
  grunt.registerTask('lint', ['jshint','curl','clean:test']);
  grunt.registerTask('minify', ['bower', 'less', 'concat', 'uglify']);
};

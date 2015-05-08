module.exports = function(grunt) {

  //Initializing the configuration object
  var path = require('path');
  grunt.initConfig({
      //--------------------CSS-GENERATION--------------------//
      less: {
        development: {
          options: {
            compress: true
          },
          files: {
            './css/frontend.css':'./less/frontend.less',
            './css/backend.css':'./less/backend.less'
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
            './lib/bootstrap/js/bootstrap.js',
            './lib/summernote/summernote.js',
            './js/script.js'
          ],
          dest: './js/frontend.js'
        },
        js_backend: {
          src: [
            './lib/jquery/jquery.js',
            './lib/bootstrap/js/*.js',
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
            './js/frontend.min.js': './js/frontend.js'
          }
        },
        backend: {
          files: {
            './js/backend.min.js': './js/backend.js'
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
        lib: ['lib/*'],
        bower: ['bower_components'],
        deploy: {
          src: ['/var/www/html/tourney/*'],
          options: { force: true }
        }
      },
      //--------------------DEPLOY----------------------------//
      copy: {
        deploy: {
          files: [{expand: true, src: [
                '*.php',
                'admin/*.php',
                'smack/*.php',
                'signup/*.php',
                'fragments/*.php',
                'js/{frontend,backend}*.js',
                'img/*',
                'fonts/*',
                'css/{frontend,backend}.css'
          ], dest: '/var/www/html/tourney/'}]
        },
        bower: {
          files: [{expand: true, cwd: 'bower_components', src: [
                'bootstrap/{fonts,less}/**',
                'bootstrap/dist/js/bootstrap.js',
                'font-awesome/{fonts,less}/**',
                'jquery/dist/*.js',
                'summernote/dist/{summernote.js,*.css}'
            ], dest: 'lib/'}]
        }
      },
      //--------------------INSTALL-DEPENDENCIES--------------//
      shell: {
        bower_install: {
          command: 'bower install'
        },
        bower_config: {
          command: [
            'mv lib/jquery/dist/* lib/jquery/',
            'rmdir lib/jquery/dist',
            'mv lib/summernote/dist/summernote.js lib/summernote/',
            'mv lib/summernote/dist/summernote.css lib/summernote/summernote.less',
            'rm -rf lib/summernote/dist',
            'mv lib/bootstrap/fonts/* fonts/',
            'mv lib/font-awesome/fonts/* fonts/',
            'rmdir lib/bootstrap/fonts lib/font-awesome/fonts',
            'mkdir lib/bootstrap/js',
            'mv lib/bootstrap/dist/js/* lib/bootstrap/js/',
            'rm -rf lib/bootstrap/dist'
              ].join('&&')
        }
      }
  });

  // Plugin loading
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bootlint');
  grunt.loadNpmTasks('grunt-phplint');
  grunt.loadNpmTasks('grunt-phpunit');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-curl');

  // Task definition
  grunt.registerTask('default', ['install-ol']);
  grunt.registerTask('install', ['bower','build', 'deploy']);
  grunt.registerTask('install-ol', ['build', 'deploy']);
  grunt.registerTask('build', ['less','concat','uglify']);
  grunt.registerTask('bower', ['clean:bower', 'clean:lib', 'shell:bower_install', 'copy:bower', 'shell:bower_config', 'clean:bower']);
  grunt.registerTask('deploy', ['clean:deploy', 'copy:deploy']);
  grunt.registerTask('lint', ['jshint','curl','bootlint','clean:test']);
  grunt.registerTask('unit', ['phpunit','quint']);
  grunt.registerTask('test', ['lint','unit']);
};

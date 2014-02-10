module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      testserver: {
        options: {
          port: 1234,
          base: '.'
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:1234'
      }
    },
    sass: {
      dist: {
        files: {
          'build/fixtures/styles/style.css' : 'sass/main.scss'
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      sass: {
        files: 'sass/**/*.scss',
        tasks: ['sass']
      },
      js: {
        files: ['scripts/**/*.js']
      },
      templates: {
        files: ['templates/**/*']
      },
      yml: {
        files: ['resume.yml']
      }
    },
    requirejs: {
      compile: {
        options: {
          mainConfigFile: "scripts/init.js",
          name: "../bower_components/almond/almond",
          out: "dist/scripts/app.js"
        }
      }
    },
    copy: {
      build: {
        files: [
          {expand: false, src: ['bower_components/foundation-icon-fonts/foundation-icons.eot'], dest: 'build/fixtures/styles/foundation-icons.eot'},
          {expand: false, src: ['bower_components/foundation-icon-fonts/foundation-icons.svg'], dest: 'build/fixtures/styles/foundation-icons.svg'},
          {expand: false, src: ['bower_components/foundation-icon-fonts/foundation-icons.ttf'], dest: 'build/fixtures/styles/foundation-icons.ttf'},
          {expand: false, src: ['bower_components/foundation-icon-fonts/foundation-icons.woff'], dest: 'build/fixtures/styles/foundation-icons.woff'}
        ]
      },
      dist: {
        files: [
          {expand: true, cwd: 'build/fixtures/', src: ['**'], dest: 'dist/'}
        ]
      },

    },
    processhtml: {
      options: {
        commentMarker: 'process'
      },
      dist: {
        files: {
          'dist/index.html': ['build/fixtures/index.html']
        }
      }
    },
    'useminPrepare': {
      html: 'build/fixtures/index.html',
    },
    'usemin': {
      html: 'dist/index.html'
    },
    'clean': {
      dist: {
        src: ['dist']
      }
    },
    yaml: {
      dist: {
        options: {
          space: 4
        },
        files: {
          'build/fixtures/resume.json': ['resume.yml']
        }
      },
    },
    'compile-handlebars': {
      resumeMarkdown: {
        template: 'templates/resume-markdown.hbs',
        templateData: 'build/fixtures/resume.json',
        output: 'build/fixtures/resume.md'
      }
    },
    handlebars: {
      compile: {
        files: {
          "build/fixtures/scripts/templates/resume.js": "templates/resume-app.hbs"
        }
      }
    },
    markdown: {
      md: {
        files: [
          {
            expand: true,
            src: 'build/fixtures/*.md',
            dest: '',
            ext: '.html'
          }
        ]
      },
      app: {
        options: {
          template: 'templates/resume-app.tmpl',
        },
        files: {
          'build/fixtures/index.html': ['build/fixtures/resume.md']
        }
      },

    },
    markdownpdf: {
      resume: {
        options: {
          phantomPath: '/usr/bin/phantomjs',
          renderDelay: 2000,
          cssPath: '../../../../../build/fixtures/styles/style.css'
        },
        src: "build/fixtures/*.md",
        dest: "build/fixtures"
      }
    }
  });


  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-compile-handlebars');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-markdown');
  grunt.loadNpmTasks('grunt-markdown-pdf');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-yaml');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('default',[
    'sass',
    'copy',
    'yaml:dist',
    'compile-handlebars',
    'markdown',
    'markdownpdf',
    'connect:testserver',
    'open',
    'watch'
  ]);


  grunt.registerTask('build',[
    'sass',
    'yaml:dist',
    'compile-handlebars',
    'markdown',
    'markdownpdf'
  ]);

  grunt.registerTask('dist',[
    'build',
    'clean:dist',
    'sass:dist',
    'requirejs',
    'copy:dist',
    'processhtml',
    'useminPrepare',
    'concat',
    'uglify',
    'cssmin',
    'usemin'
  ]);
};

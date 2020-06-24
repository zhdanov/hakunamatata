module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-stylelint');


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      css: {
        files: [
            'frontend/_base/**/*.css',
            'frontend/desktop/**/*.css',
            'frontend/mobile/**/*.css',
            'frontend/mobile_landscape/**/*.css',
            'frontend/mobile_portrait/**/*.css',
            'frontend/main.css',
        ],
        tasks: ['watch_css'],
        options: {
          event: ['changed', 'added', 'deleted']
        },
      },
      js: {
        files: [
            'frontend/_base/**/*.js',
            'frontend/desktop/**/*.js',
            'frontend/mobile/**/*.js',
            'frontend/mobile_landscape/**/*.js',
            'frontend/mobile_portrait/**/*.js'
        ],
        tasks: ['watch_js'],
        options: {
          event: ['changed', 'added', 'deleted']
        },
      }
    },

    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env'],
        plugins: ["@babel/plugin-proposal-class-properties"]
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'frontend/',
            src: ['**/*.js'],
            dest: 'blocks_babel'
          }
        ]
      }
    },

    stylelint: {
      options: {
        configFile: '.stylelintrc',
        formatter: 'string',
        ignoreDisables: false,
        failOnError: true,
        outputFile: '',
        reportNeedlessDisables: false,
        syntax: ''
      },
      src: [
              'frontend/_base/**/*.css',
              'frontend/desktop/**/*.css',
              'frontend/mobile/**/*.css',
              'frontend/mobile_partrait/**/*.css',
              'frontend/mobile_landscape/**/*.css',
          ]
    },

    concat_css: {
      options: {},
      base: {
        src: ["frontend/_base/**/*.css"],
        dest: "build/_base.css"
      },
      desktop: {
        src: ["frontend/desktop/**/*.css"],
        dest: "build/desktop.css"
      },
      mobile: {
        src: ["frontend/mobile/**/*.css"],
        dest: "build/mobile.css"
      },
      mobile_portrait: {
        src: ["frontend/mobile_portrait/**/*.css"],
        dest: "build/mobile_portrait.css"
      },
      mobile_landscape: {
        src: ["frontend/mobile_landscape/**/*.css"],
        dest: "build/mobile_landscape.css"
      },
    },

    postcss: {
      options: {
        processors: [
          require('postcss-import')(),
          require('postcss-simple-vars')(),
          require('postcss-easings')(),
          require('postcss-flexbugs-fixes')(),
          require('autoprefixer')({"overrideBrowserslist": [
            "Android > 1",
            "Baidu > 1",
            "BlackBerry > 1",
            "Chrome > 1",
            "ChromeAndroid > 1",
            "Edge > 1",
            "Explorer > 1",
            "ExplorerMobile > 1",
            "Firefox > 1",
            "FirefoxAndroid > 1",
            "iOS > 1",
            "Opera > 1",
            "OperaMini > 1",
            "OperaMobile > 1",
            "QQAndroid > 1",
            "Safari > 1",
            "Samsung > 1",
            "UCAndroid > 1",
            "kaios > 1"
          ]}),
          require('cssnano')()
        ]
      },
      dist: {
          files: [{
              src:  'frontend/main.css',
              dest: 'public/assets/css/h.min_<%= pkg.version %>.css'
          }]
      }
    },

    uglify: {
      hakunamatata: {
        files: {
          'public/assets/js/h.min_<%= pkg.version %>.js': [
            'blocks_babel/**/*.js'
          ]
        }
      }
    }

  });

  grunt.registerTask('default', ['stylelint', 'babel', 'uglify', 'concat_css', 'postcss']);
  grunt.registerTask('watch_css', ['stylelint', 'concat_css', 'postcss']);
  grunt.registerTask('watch_js', ['babel', 'uglify']);

};

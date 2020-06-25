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
            'frontend/_base/**/css/*.css',
            'frontend/desktop/**/css/*.css',
            'frontend/mobile/**/css/*.css',
            'frontend/mobile_landscape/**/css/*.css',
            'frontend/mobile_portrait/**/css/*.css',
            'frontend/main.css',
        ],
        tasks: ['watch_css'],
        options: {
          event: ['changed', 'added', 'deleted']
        },
      },
      js: {
        files: [
            'frontend/_base/**/js/*.js',
            'frontend/desktop/**/js/*.js',
            'frontend/mobile/**/js/*.js',
            'frontend/mobile_landscape/**/js/*.js',
            'frontend/mobile_portrait/**/js/*.js'
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

  grunt.registerTask('render_html', 'Render HTML', function() {
    var fs = require('fs');
    var path = require('path')
    var bemxjst = require('bem-xjst');
    var bemhtml = bemxjst.bemhtml;

    var pkg = JSON.parse(fs.readFileSync(__dirname + '/package.json').toString());

    var frontendDir = __dirname + '/frontend';
    var htmlDirName = 'html';

    var layerList = [
      '_base',
      'desktop',
      'mobile',
      'mobile_landscape',
      'mobile_portrait'
    ];

    // blocks
    layerList.forEach(layer => {
      fs.readdirSync(frontendDir + '/' + layer).map(function (dir) {
        var filePathLayerDir = frontendDir + '/' + layer + '/' + dir;

        if (!fs.existsSync(filePathLayerDir + '/' + htmlDirName)){
          return null;
        }

        fs.readdirSync(filePathLayerDir + '/' + htmlDirName).map(function (file) {
          var filePath = filePathLayerDir + '/' + htmlDirName + '/' + file;

          if (path.parse(filePath).ext == '.bemjson') {
            var fileName = path.parse(filePath).name;
            var bemjson = JSON.parse(fs.readFileSync(filePath).toString());
            var template = fs.readFileSync(filePathLayerDir + '/' + htmlDirName + '/' + fileName + '.bemhtml').toString();
            var html = bemhtml.compile(template).apply(bemjson);
            var filePathHtml = filePathLayerDir + '/' + htmlDirName + '/' + fileName + '.html';

            if (!fs.existsSync(filePathLayerDir + '/' + htmlDirName)){
              fs.mkdirSync(filePathLayerDir + '/' + htmlDirName);
            }

            fs.writeFileSync(filePathHtml, html);
          }

        });
      });
    });

    // showcase
    var bemjson = JSON.parse(fs.readFileSync(__dirname + '/public/index.bemjson').toString());
    bemjson.version = pkg.version;
    var template = fs.readFileSync(__dirname + '/public/index.bemhtml').toString();
    var html = bemhtml.compile(template).apply(bemjson);
    fs.writeFileSync(__dirname + '/public/index.html', html);

  });

  grunt.registerTask('default', ['stylelint', 'babel', 'uglify', 'concat_css', 'postcss', 'render_html']);
  grunt.registerTask('watch_css', ['stylelint', 'concat_css', 'postcss']);
  grunt.registerTask('watch_js', ['babel', 'uglify']);

};

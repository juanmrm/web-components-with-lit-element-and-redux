// Karma configuration
const webpack = require('webpack');

const webpackConfig = {
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'tslint-loader',
          exclude: /node_modules/,
          enforce: 'pre'
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader?silent=true',
          exclude: /node_modules/
        },
        {
          test: /\.ts$/,
          exclude: /(node_modules|\.spec\.ts$)/,
          loader: 'istanbul-instrumenter-loader',
          enforce: 'post',
          options: {
            esModules: true
          }
        }
      ]
    },
    plugins: [
      new webpack.SourceMapDevToolPlugin({
        filename: null,
        test: /\.(ts|js)($|\?)/i
      })
    ],
    resolve: {
      extensions: ['.ts', '.js']
    }
  };

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],

    // list of files / patterns to load in the browser
    files: [
        '**/test/timer-app.test.js',
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        '**/test/*.test.js': ['webpack','babel','sourcemap']
    },

    webpack: webpackConfig,

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['coverage-istanbul'],

    coverageIstanbulReporter: {
        // reports can be any that are listed here: https://github.com/istanbuljs/istanbuljs/tree/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib
        reports: ['html', 'text-summary'],
   
        // Combines coverage information from multiple browsers into one report rather than outputting a report
        // for each browser.
        combineBrowserReports: true,
   
        // if using webpack and pre-loaders, work around webpack breaking the source path
        fixWebpackSourcePaths: true,
   
        // Omit files with no statements, no functions and no branches from the report
        skipFilesWithNoCoverage: true,
   
        // Most reporters accept additional config options. You can pass these through the `report-config` option
        'report-config': {
          // all options available at: https://github.com/istanbuljs/istanbuljs/blob/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib/html/index.js#L135-L137
          html: {
            // outputs the report in ./coverage/html
            subdir: 'html'
          }
        },

        // enforce percentage thresholds
        // anything under these percentages will cause karma to fail with an exit code of 1 if not running in watch mode
        thresholds: {
            emitWarning: false, // set to `true` to not fail the test command when thresholds are not met
            // thresholds for all files
            global: {
                statements: 60,
                lines: 60,
                branches: 60,
                functions: 60
            },
            // thresholds per file
            each: {
                statements: 60,
                lines: 60,
                branches: 60,
                functions: 60,                
            }
        },
    
        verbose: false // output config used by istanbul for debugging
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}

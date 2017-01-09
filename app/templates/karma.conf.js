// Run this file standalone with: node_modules\.bin\karma start karma.conf.js. This requires the basePath config to be set.
module.exports = function(config) {
    config.set({
        //basePath: '',
        frameworks: ['jasmine'],
        files: [
            /* vendor */
            //'test/vendor/jquery.min.js',
            //'test/vendor/knockout-3.2.0.js',
            /* helpers */
            //'test/helpers/*.js',
            /* sources */
            //'js/util/*.js',
            //'js/viewmodels/*.js',
            'js/app.js',
            /* spec */
            //'test/util/*Spec.js',
            //'test/viewmodels/*Spec.js',
            'test/appSpec.js'
        ],
        browsers: ['PhantomJS'],//['PhantomJS', 'Chrome']
        singleRun: true,
        reporters: ['progress', 'coverage'],
        preprocessors: { 'js/**/*.js': ['coverage'] },
        coverageReporter: {
            reporters: [
                { type: 'html', dir: '../../../../../../analysis/coverage/' },
                { type: 'text-summary' }
            ]
        }
    });
};
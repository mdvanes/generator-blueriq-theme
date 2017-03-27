#!/usr/bin/env node
/* eslint-env node */

module.exports = function(grunt) {
    'use strict';

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    var pkg = require('./package.json'); // read package.json to expose its variables under pkgJson
    var srcRoot = 'webresources/mvc/v2/themes/' + pkg.name + '/src/';
    var distRoot = 'webresources/mvc/v2/themes/' + pkg.name + '/dist/';

    var src = {
        scripts: [
            '<%= srcRoot %>js/handlers/**.js',
            '<%= srcRoot %>js/viewmodels/**.js',
            '<%= srcRoot %>js/app.js'
        ]
    };

    // Project configuration.
    grunt.initConfig({
        // expose global variables to grunt
        pkg: pkg,
        srcRoot: srcRoot,
        distRoot: distRoot,

        watch: {
            sass: {
                files: ['<%= srcRoot %>sass/**/*.scss'],
                tasks: ['stylelint:all', 'sass:dev']
            },
            script: {
                files: ['<%= srcRoot %>js/**/*.js', '<%= srcRoot %>test/**/*.js'],
                tasks: ['eslint', 'karma:dev:run', 'uglify:dev']
            },
            images: {
                files: ['<%= srcRoot %>img/*.*'],
                tasks: ['newer:imagemin:dev']
            },
            templates: {
                files: ['<%= srcRoot %>/template/**/*.html'],
                tasks: ['kot2html']
            }
        },

        stylelint: {
            options: {
                configFile: '.stylelintrc',
                syntax: 'scss'
            },
            all: ['<%= srcRoot %>sass/**/*.scss']
        },

        sass: {
            options: {
                sourceMap: true
            },
            dev: {
                options: {
                    outputStyle: 'expanded'
                },
                files: {
                    '<%= distRoot %>css/styles.css': '<%= srcRoot %>sass/styles.scss'
                }
            },
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    '<%= distRoot %>css/styles.css': '<%= srcRoot %>sass/styles.scss'
                }
            }
        },

        eslint: {
            options: {
                configFile: '.eslintrc'
            },
            all: ['Gruntfile.js', '<%= srcRoot %>js/**/*.js', '<%= srcRoot %>test/**/*.js', '<%= srcRoot %>test/vendor/**/*.js']
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd HH:MM") %> */'
            },
            dev: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true,
                    // for debugging
                    beautify: true,
                    mangle: false,
                    compress: false
                },
                files: {
                    '<%= distRoot %>js/<%= pkg.name.toLowerCase() %>.js': src.scripts
                }
            },
            dist: {
                files: {
                    '<%= distRoot %>js/<%= pkg.name.toLowerCase() %>.min.js': src.scripts
                }
            }
        },

        kot2html: {
            all: {
                prefix: 'themes/<%= pkg.name.toLowerCase() %>/',
                srcRoot: '<%= srcRoot %>/',
                src: 'template/**/*.html',
                dest: '<%= distRoot %>/template/custom-templates.html'
            }
        },

        imagemin: {
            dev: {
                files: [{
                    expand: true,
                    cwd: '<%= srcRoot %>img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= distRoot %>img/'
                }]
            }
        },

        karma: {
            dev: {
                basePath: '<%= srcRoot %>',
                configFile: 'karma.conf.js',
                background: true,
                singleRun: false
            },
            dist: {
                basePath: '<%= srcRoot %>',
                configFile: 'karma.conf.js'
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        '<%= distRoot %>js/*.js',
                        '<%= distRoot %>css/*.css',
                        '<%= distRoot %>img/*.*',
                        '<%= srcRoot %>_stubs/*.html'
                    ]
                },
                options: {
                    server: './',
                    watchTask: true, // watch runs after browserSync
                    port: 8282, // default port is 3000, browserSync admin is on http://localhost:3001/
                    directory: true, // show directory listing
                    open: false // don't open the browser automatically
                }
            }
        },

        'notify_hooks': {
            options: {
                enabled: true,
                title: '<%= pkg.name.toLowerCase() %>', // defaults to the name in package.json, or will use project directory's name
                success: false, // whether successful grunt executions should be notified automatically
                duration: 3 // the duration of notification in seconds, for `notify-send only
            }
        }
    });

    // Tasks
    grunt.registerTask('default-watch', ['browserSync', 'karma:dev:start', 'watch']); /* for running when validators fail */
    grunt.registerTask('default', ['eslint', 'uglify:dev', 'stylelint:all', 'sass:dev', 'kot2html:all', 'newer:imagemin:dev', 'default-watch']);
};
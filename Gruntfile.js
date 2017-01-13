#!/usr/bin/env node
/* eslint-env node */

module.exports = function(grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        eslint: {
            options: {
                configFile: '.eslintrc'
            },
            all: ['Gruntfile.js', 'app/**/*.js', 'vm/**/*.js', 'test/**/*.js']
        },

        mochacli: {
            options: {
                //require: ['should'],
                reporter: 'spec'
                //bail: true
            },
            all: ['test/**/*.js']
        },

        release: {
            options: {
                changelog: true,
                push: false, // push to git manually
                pushTags: false
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

    grunt.registerTask('test', ['eslint', 'mochacli']);
    grunt.registerTask('default', ['test']);

};
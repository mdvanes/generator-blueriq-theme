/* eslint-env node, mocha */
// Run on CLI with `node node_modules\mocha\bin\mocha`

const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');

describe('blueriq-theme:app', () => {
    'use strict';

    describe('generates a new theme', () => {
        before(() => {
            return helpers
                .run(path.join(__dirname, '../app'))
                .withPrompts({ name: 'UnitTestTheme' }) // Mock the prompt answers
                .toPromise();
        });

        it('creates files', () => {
            const expected = [
                '.eslintrc',
                '.yo-rc.json',
                'Gruntfile.js',
                'karma.conf.js',
                'package.json',
                'setupSymLinks.bat',
                'UI/mvc/v2/UnitTestTheme.stg',
                'webresources/mvc/v2/themes/UnitTestTheme/src/js/app.js',
                'webresources/mvc/v2/themes/UnitTestTheme/src/stubs/index.html'
            ];
            assert.file(expected);
        });
    });
});

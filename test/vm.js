/* eslint-env node, mocha */
// Run on CLI with `node node_modules\mocha\bin\mocha`

const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const path = require('path');
const fs = require('fs');

describe('blueriq-theme:vm', () => {
    'use strict';

    describe('generates a new view model', () => {
        before(() => {
            return helpers
                .run(path.join(__dirname, '../vm'))
                //.withOptions({ foo: 'bar' })    // Mock options passed in
                .withArguments(['Foo'])      // Mock the arguments
                //.withPrompts({ name: 'UnitTestTheme' }) // Mock the prompt answers
                .inTmpDir(tmpDir => {
                    fs.writeFileSync(
                        path.join(tmpDir, '.yo-rc.json'),
                        '{"generator-blueriq-theme": { "appName": "UnitTestTheme"}}'
                    );
                    // TODO remove
                    //fs.mkdirSync(
                    //    path.join(tmpDir, 'webresources')
                    //);
                    //fs.mkdirSync(
                    //    path.join(tmpDir, 'webresources/mvc')
                    //);
                    //fs.mkdirSync(
                    //    path.join(tmpDir, 'webresources/mvc/v2')
                    //);
                    //fs.mkdirSync(
                    //    path.join(tmpDir, 'webresources/mvc/v2/themes')
                    //);
                    //fs.mkdirSync(
                    //    path.join(tmpDir, 'webresources/mvc/v2/themes/UnitTestTheme')
                    //);
                    //fs.mkdirSync(
                    //    path.join(tmpDir, 'webresources/mvc/v2/themes/UnitTestTheme/src')
                    //);
                    //fs.mkdirSync(
                    //    path.join(tmpDir, 'webresources/mvc/v2/themes/UnitTestTheme/src/js')
                    //);
                    //fs.mkdirSync(
                    //    path.join(tmpDir, 'webresources/mvc/v2/themes/UnitTestTheme/src/js/viewmodels')
                    //);
                })
                .toPromise();
        });

        it('creates files', () => {
            const expected = [
                'webresources/mvc/v2/themes/UnitTestTheme/src/js/viewmodels/Foo.js'
            ];
            assert.file(expected);
        });
    });
});

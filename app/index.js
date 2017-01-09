/**
 * Created by m.van.es on 12-10-2015.
 */

/*
    Sets up the basic toolchain.
    Creates a package.json and Gruntfile with configurations.

    Tested with Yeoman 1.8.5

    * run locally for debugging:
        * set up: ```npm link``` now a the local project is accessible globally
        * in any dir run ```yo blueriq-theme```
 */

var generators = require('yeoman-generator'),
    yosay = require('yosay'),
    path = require('path'),
    chalk = require('chalk'),
    pkg = require('../package.json');

// an example: https://github.com/yeoman/generator-gruntplugin/blob/master/app/index.js

module.exports = generators.Base.extend({
    intro: function() {
        console.log(yosay('Welcome to the Blueriq Theme generator v' + pkg.version + '!'));
    },
    askFor: function() {
        var cb = this.async();
        var prompts = [
            {
                name: 'name',
                message: 'project name'
            }
        ];

        var self = this;

        this.prompt(prompts, function(props) {
            self.props = props;
            cb();
        });
    },
    writePackageJson: function() {
        var userName = process.env['USERPROFILE'].split(path.sep).pop();
        if(!userName || userName.length === '0' || userName === 'm.van.es') {
            userName = 'M.D. van Es';
        }
        var pkgFile = {
            name: this.props.name,
            version: '0.0.0',
            author: userName,
            description: '',
            repository: {
                type: 'git',
                url: ''
            },
            private: true,
            license: 'closed'
        };
        this.write('package.json', JSON.stringify(pkgFile, null, 4));
    },
    installDevDependencies: function() {
        var self = this;
        this.npmInstall([
            'grunt',
            'grunt-browser-sync',
            'grunt-contrib-imagemin',
            'grunt-contrib-uglify',
            'grunt-contrib-watch',
            'grunt-eslint',
            'grunt-newer',
            'grunt-notify',
            'grunt-sass', 'grunt-stylelint',
            'jasmine-core', 'karma', 'karma-coverage', 'karma-jasmine', 'karma-phantomjs-launcher', 'grunt-karma',
            'load-grunt-tasks',
            'time-grunt'],
            { 'saveDev': true },
            function() {
                console.log('Dev dependency installation completed.');
                self.outtro(); // Show the outtro a second time, after installing the packages.
            }
        );
    },
    copyTemplates: function() {
        // UI
        this.fs.copyTpl(
            this.templatePath('stg/template.stg'),
            this.destinationPath('UI/mvc/v2/' + this.props.name + '.stg'),
            { projectName: this.props.name }
        );
        // Webresources
        this.fs.copy(
            this.templatePath('webresources/**/*'),
            this.destinationPath('webresources/mvc/v2/themes/' + this.props.name + '/src'),
            {
                globOptions: {
                    ignore: ['_stubs/index.html'] // This doesn't seem to ignore, but the file is overwritten below anyway
                }
            }
        );
        this.fs.copyTpl(
            this.templatePath('webresources/stubs/index.html'),
            this.destinationPath('webresources/mvc/v2/themes/' + this.props.name + '/src/stubs/index.html'),
            { projectName: this.props.name }
        );
        // Root
        this.fs.copy(
            this.templatePath('*'),
            this.destinationPath(''),
            {
                globOptions: {
                    dot: true
                }
            }
        );
        this.fs.copyTpl(
            this.templatePath('setupSymLinks.bat'),
            this.destinationPath('setupSymLinks.bat'),
            { projectName: this.props.name }
        );
    },
    outtro: function() {
        console.log(chalk.bold.green('Run `grunt` and visit the server at http://localhost:8282/webresources/mvc/v2/themes/' + this.props.name + '/src/stubs/'));
    }
});

#!/usr/bin/env node
/* eslint-env node */

/*
    Sets up the basic toolchain.
    Creates a package.json and Gruntfile with configurations.

    Tested with Yeoman 1.8.5

    * run locally for debugging:
        * set up: ```npm link``` now a the local project is accessible globally
        * in any dir run ```yo blueriq-theme```
 */

const Generator = require('yeoman-generator'),
    yosay = require('yosay'),
    path = require('path'),
    chalk = require('chalk'),
    hasbin = require('hasbin'),
    pkg = require('../package.json');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        // Run example: yo blueriq-theme --force-npm=true
        this.option('forceNpm', {
            description: 'Force using NPM, even if Yarn is installed. (default=false)',
            type: String,
            default: false
        });
    }

    intro() {
        this.log(yosay('Welcome to the Blueriq Theme generator v' + pkg.version + '!'));
    }

    askFor() {
        return this.prompt([{
            type: 'input',
            name: 'name',
            message: 'project name',
            default : this.appname // Default to current folder name
        }]).then(props => {
            this.props = props;
            this.config.set({'appName': this.props.name});
        });
    }

    writePackageJson() {
        let userName = process.env['USERPROFILE'];
        if(userName) {
            userName = userName.split(path.sep).pop();
        }
        if(!userName || userName.length === '0' || userName === 'm.van.es') {
            userName = 'M.D. van Es';
        }
        const pkgFile = {
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
        this.fs.writeJSON('package.json', pkgFile);
    }

    installDevDependencies() {
        const dependencies = [
            'grunt',
            'grunt-browser-sync',
            'grunt-contrib-imagemin',
            'grunt-contrib-uglify',
            'grunt-contrib-watch',
            'grunt-kot2html',
            'grunt-eslint',
            'grunt-newer',
            'grunt-notify',
            'grunt-sass', 'grunt-stylelint',
            'jasmine-core', 'karma', 'karma-coverage', 'karma-jasmine', 'karma-phantomjs-launcher', 'grunt-karma',
            'load-grunt-tasks',
            'time-grunt'];
        const onCompleted = () => {
            this.log('Dev dependency installation completed.');
            this.outtro(); // Show the outtro a second time, after installing the packages.
        };
        const isYarnAvailable = hasbin.sync('yarn');

        if(isYarnAvailable && (!this.options.forceNpm || this.options.forceNpm !== 'true')) {
            this.log('Using Yarn to install dependencies.');
            this.yarnInstall(dependencies, { 'dev': true }, onCompleted);
        } else {
            this.log('Using NPM to install dependencies.');
            // It's possible to use this.installDependencies to install the dependencies listed in the package.json,
            // but using npmInstall will always install the latest versions of the dependencies instead of the specified versions.
            this.npmInstall(dependencies, { 'save-dev': true }, () => {
                // Run `npm shrinkwrap --dev`
                this.spawnCommand('npm', ['shrinkwrap', '--dev']);
                onCompleted();
            });
        }
    }

    copyTemplates() {
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
                    ignore: ['stubs/index.html'] // This doesn't seem to ignore, but the file is overwritten below anyway
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
    }

    outtro() {
        this.log(chalk.bold.green('Run `grunt` and visit the server at http://localhost:8282/webresources/mvc/v2/themes/' + this.props.name + '/src/stubs/'));
    }
};

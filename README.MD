![Build Status](https://travis-ci.org/mdvanes/generator-blueriq-theme.svg?branch=master) [![npm version](https://badge.fury.io/js/generator-blueriq-theme.svg)](https://badge.fury.io/js/generator-blueriq-theme)

# Installation

The generator requires Yeoman:

```
npm i -g yo
```

Install or update this Yeoman generator with:

```
npm i -g generator-blueriq-theme
```
Then scaffold a project by running in the target dir:

```
yo blueriq-theme
```

After setting up run:

```
grunt
```

and visit http://localhost:8282/webresources/mvc/v2/themes/[your_theme_name]/src/stubs/

Required manual steps:

* filling the STG @TODO document
* core and bootstrap3 dirs @TODO document
* run setupSymLinks.bat and modify aquima.properties @TODO document

# Purpose

The goal of this generator is to set up as fast as possible, so there is very little interactive input during setup. 
It sets up a new Blueriq 9.8+ KnockoutJS theme (front-end architecture v2) with:

* grunt
* grunt-browser-sync
* grunt-contrib-uglify
* grunt-contrib-watch
* grunt-eslint
* grunt-notify
* grunt-sass
* grunt-stylelint
* grunt-karma
* load-grunt-tasks
* time-grunt

Scaffolds \_js, \_sass, \_stubs, _test dirs and .gitignore, .eslintrc, .stylelintrc, .editorconfig, Gruntfile.js, karma.conf.js files.
@TODO correct paths

The package.json will be set up with the default windows username, and if it's not available, it will fallback to my name. 

The default license in the generated package.json is "closed" and "private" is set to true to prevent accidental publishing to NPM.

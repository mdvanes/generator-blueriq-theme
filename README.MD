![Build Status](https://travis-ci.org/mdvanes/generator-blueriq-theme.svg?branch=master) [![npm version](https://badge.fury.io/js/generator-blueriq-theme.svg)](https://badge.fury.io/js/generator-blueriq-theme)


# Purpose

The goal of this generator is to set up a Blueriq theme as fast as possible, so there is very little interactive input during setup. 
It sets up a new Blueriq 9.8+ KnockoutJS theme (front-end architecture v2) with:

* grunt
* grunt-browser-sync
* grunt-contrib-imagemin
* grunt-contrib-uglify
* grunt-contrib-watch
* grunt-kot2html
* grunt-eslint
* grunt-notify
* grunt-sass
* grunt-stylelint
* grunt-karma with jasmine
* load-grunt-tasks
* time-grunt

Scaffolds img, js, sass, stubs, template, and test dirs and .editorconfig, .eslintrc, .gitignore, .stylelintrc, 
Gruntfile.js, karma.conf.js, LICENSE.txt and setupSymLinks.bat files. Also a yarn.lock or npm-shrinkwrap.json will be generated.

The package.json will be set up with the default windows username, and if it's not available, it will fallback to my name. 

The default license in the generated package.json is "closed" and "private" is set to true to prevent accidental publishing to NPM.


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

The generator will try to install packages with Yarn if available and otherwise falls back to NPM. If you want to force the use of NPM use the forceNpm flag:

```
yo blueriq-theme --forceNpm=true
```

After setting up run:

```
grunt
```

and visit http://localhost:8282/webresources/mvc/v2/themes/[your_theme_name]/src/stubs/

Required manual steps:

* Copy the contents from an existing STG to the generated STG and add the paths of the generated JS and CSS files. 
* The Core and Bootstrap3 dirs are needed for development when running a stub of the STG. 
* Run setupSymLinks.bat and modify aquima.properties to make the theme available in a Blueriq Runtime.


# Subgenerators

After setting up a new theme, subgenerators can be used to set up new components.

To set up a new view model, run ```yo blueriq-theme:vm Foo```, where Foo is the name of the new view model. The name will be
used as the filename and also the internal name (this will be added to the existing namespace, in this example yielding
```blueriq.models.Foo```). UpperCamelCase is recommended and the use of the "Model" or "ViewModel" suffix is discouraged.

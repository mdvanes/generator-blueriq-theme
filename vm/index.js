#!/usr/bin/env node
/* eslint-env node */

/**
 * Blueriq KO Theme ViewModel generator
 * @description Create a new Blueriq Knockout viewmodel in <themename>/js/<viewmodelname>
 * @type {*|exports|module.exports}
 * @example yo blueriq-theme:vm MyNewViewModel
 */
var Generator = require('yeoman-generator'),
    chalk = require('chalk');

module.exports = class extends Generator {
    createFile() {
        // Accept the name as an argument
        this.argument('newName', {
            description: 'The name of the new VM',
            required: true,
            type: String
        });

        // Optional argument to select what viewmodel to extend. Default is ContainerModel
        this.argument('extendVm', {
            description: 'The name of the VM that should be extended',
            default: 'ContainerModel',
            type: String
        });

        // Basic setup extending e.g. ContainerModel
        const content = `(function(blueriq) {
    'use strict';

    blueriq.models.${this.options.newName}(model, context) {
        var self = this;
        blueriq.models.${this.options.extendVm}.call(self, model, context);
    }
})(window.blueriq);
        `;

        // Write file
        const appName = this.config.get('appName');
        const srcRoot = `webresources/mvc/v2/themes/${appName}/src`;
        const path = `${srcRoot}/js/viewmodels/${this.options.newName}.js`;
        this.fs.write(path, content);

        this.log(`Setting up a new KO ViewModel blueriq.models.${this.options.newName} extending blueriq.models.${this.options.extendVm}`);
        // Do not register the vm in the factory, because the logic can't be predicted
    }
};

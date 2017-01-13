#!/usr/bin/env node
/* eslint-env node */

/**
 * Blueriq KO Theme ViewModel generator
 * TODO add documentation, accept vm name as param.
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

        this.log(`Setting up a new KO ViewModel ${this.options.newName} extending blueriq.models.${this.options.extendVm}`);

        // Basic setup extending e.g. ContainerModel
        const content = `
(function(blueriq) {
    'use strict';

    blueriq.models.${this.options.newName}(model, context) {
        var self = this;
        blueriq.models.${this.options.extendVm}.call(self, model, context);
    }
})(window.blueriq);
        `;

        // Write file
        // TODO fix path
        this.fs.write(`js/${this.options.newName}.js`, content);
        // Do not register the vm in the factory, because the logic can't be predicted
    }
};

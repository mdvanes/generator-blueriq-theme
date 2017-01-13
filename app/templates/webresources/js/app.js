(function() {
    'use strict';

    var myAppTest = function() {
        return 'app.js';
    };
    console.log(myAppTest()); // eslint-disable-line no-console
    window.myAppTest = myAppTest;
})();
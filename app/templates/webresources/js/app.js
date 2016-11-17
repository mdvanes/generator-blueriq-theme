(function() {
    'use strict';

    var myAppTest = function() {
        return 'app.js';
    };
    console.log(myAppTest());
    window.myAppTest = myAppTest;
})();
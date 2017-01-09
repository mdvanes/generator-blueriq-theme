/* eslint-env jasmine */
(function(myAppTest) {
    'use strict';

    describe('Example function', function() {

        it('should have the global myAppTest function', function() {
            expect(myAppTest).toBeDefined();
        })

    });
})(window.myAppTest);
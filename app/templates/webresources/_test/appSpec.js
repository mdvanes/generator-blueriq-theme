/* jshint jasmine:true */
(function(myAppTest) {
    'use strict';

    describe('Example function', function() {

        it('should have the global myAppTest function', function() {
            expect(myAppTest).toBeDefined();
        })

    });
})(window.myAppTest);
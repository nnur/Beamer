describe('auth service', function() {

    var auth, jwtHelper, $httpBackend, mockSession;


    ///////////////////   INITIALIZATION   ///////////////////

    beforeEach(function() {

        //.............   module mocks   ...............//
        angular.module('angular-jwt', []);
        module('beamer.auth');

        module(function($provide) {
            $provide.service('session', function() {
                this.isValid = function() {};
                this.destroy = function() {};
            });
        });


        //.............   injections   ...............//
        inject(function(_auth_, _session_) {
            auth = _auth_;
            mockSession = _session_;
        });

        inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
        });
    });


    /////////////////////////   TESTS   ///////////////////////// 

    it('should check if session is valid and return the result',
        function() {
            spyOn(mockSession, 'isValid').and.returnValue(true);
            auth.isAuthenticated();
            expect(mockSession.isValid).toHaveBeenCalled();
        });

    it('should logout the user by destroying their session',
        function() {
            spyOn(mockSession, 'destroy').and.callThrough();
            auth.logout();
            expect(mockSession.destroy).toHaveBeenCalled();
        });
});

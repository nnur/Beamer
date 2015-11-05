describe('auth service', function() {

    var auth, jwtHelper, $httpBackend, mockSession;
    var deferred, promise, authRequestHandler;
    var root = 'http://localhost:1337';


    beforeEach(function() {
        angular.module('angular-jwt', []);
        module('beamer.auth');
    });

    beforeEach(function() {
        module(function($provide) {
            $provide.service('session', function() {
                this.isValid = function() {};
                this.destroy = function() {};
            });
        });
    });

    beforeEach(function() {
        inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
        });
    });

    beforeEach(
        inject(function(_auth_, _session_, $q) {
            auth = _auth_;
            mockSession = _session_;
            //handling promises
            deferred = $q.defer();
        }));



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

    it('should send a post to /signup and receive a promise',
        function() {
            var user = 'testUser';

            $httpBackend.expectPOST(root + '/user/signup', user)
                .respond(deferred.promise);
            auth.createNewUser(user);
            $httpBackend.flush();
        });

    it('should send a post to /login and receive a promise',
        function() {
            var user = 'testUser';
            $httpBackend.expectPOST(root + '/user/login', user)
                .respond(deferred.promise);
            auth.loginUser(user);
            $httpBackend.flush();
        });
});

describe('session service', function() {
    var sessionService, jwtHelper, session;


    angular.module('angular-jwt', []);

    beforeEach(module('beamer.session'));

    beforeEach(module(function($provide) {
        jwtHelper = {};
        $provide.value('jwtHelper', jwtHelper);
    }));

    beforeEach(inject(function(_sessionService_) {
        sessionService = _sessionService_;
    }));

    it('should end the session', function() {
        jwtHelper.isTokenExpired = function(token) {

            return true;
        }

        spyOn(sessionService, 'endSession').and.callThrough();
        sessionService.endSession('token');
        expect(session).toBe(null);
    });
});

describe('session service', function() {
    var session, jwtHelper;



    angular.module('angular-jwt', []);

    beforeEach(module('beamer.session'));

    beforeEach(module(function($provide) {
        jwtHelper = {};
        $provide.value('jwtHelper', jwtHelper);
    }));

    beforeEach(inject(function(_session_) {
        session = _session_;
    }));




    it('should initialize a session', function() {
        expect(session.expDate).toBeUndefined();
        expect(session.userid).toBeUndefined();
        expect(session.token).toBeUndefined();
        expect(jwtHelper).toBe(session.jwtHelper_);
    });


    it('should create a session', function() {

        var token = 'testToken';

        var jwtHelperSpy = jasmine.createSpyObj('jwtHelper', ['getTokenExpirationDate', 'decodeToken']);
        jwtHelperSpy.getTokenExpirationDate.and
            .returnValue('testDate');
        jwtHelperSpy.decodeToken.and
            .returnValue({
                id: 'testId'
            });

        angular.extend(jwtHelper, jwtHelperSpy);

        session.create(token);

        expect(jwtHelper.getTokenExpirationDate).toHaveBeenCalledWith(token);
        expect(jwtHelper.decodeToken).toHaveBeenCalledWith(token);

        expect(session.expDate).toEqual('testDate');
        expect(session.userid).toEqual('testId');
        expect(session.token).toEqual('testToken');
    });



    it('should destroy the session', function() {

        angular.extend(session, {
            expDate: 'testDate',
            userid: 'testId',
            token: 'testToken'
        });

        session.destroy();

        expect(session.expDate).toBeNull();
        expect(session.userid).toBeNull();
        expect(session.token).toBeNull();
    });


    it('should check if token is valid and return boolean', function() {
        session.token = "testToken";
        jwtHelper.isTokenExpired = jasmine.createSpy('isTokenExpired').and.returnValue(true);
        expect(jwtHelper.getTokenExpirationDate).toHaveBeenCalledWith("testToken");

    });

});
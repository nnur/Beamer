describe('SignupController', function() {

    var auth, deferred, controller, $scope, rootScope;

    beforeEach(function() {
        module('beamer.controllers.signup');
    });

    beforeEach(function() {
        module(function($provide) {
            jwtHelper = {};
            $provide.value('jwtHelper', jwtHelper);

        });
    });

    beforeEach(function() {
        module(function($provide) {
            $provide.service('auth', function() {
                this.createNewUser = function() {};
            });
        });
    });

    beforeEach(inject(function(_$controller_, _auth_, $rootScope, $q) {
        $scope = {};
        $controller = _$controller_;
        controller = $controller('SignupController', {
            $scope: $scope
        });
        rootScope = $rootScope;
        deferred = $q.defer();
        auth = _auth_;
    }));


    describe('$scope.signup', function() {

        it("should create error if pwd values don't match", function() {
            $scope.user = {
                newEmail: 'testEmail',
                pwd1: 'testPwd',
                pwd2: 'testPwd2'
            };
            $scope.signup();
            expect($scope.error).toEqual("passwords don't match");
        });

        it("should call auth.createNewUser and the returned promise", function() {
            var resolvedValue;
            var promise = deferred.promise;
            promise.then(function(value) {
                resolvedValue = value;
            });

            $scope.user = {
                newEmail: 'testEmail',
                pwd1: 'testPwd',
                pwd2: 'testPwd'
            };
            var user = {};


            spyOn(auth, 'createNewUser').and.returnValue(promise);
            $scope.signup();
            expect(auth.createNewUser).toHaveBeenCalled();

            deferred.resolve(123);
            expect(resolvedValue).toBeUndefined();
            rootScope.$apply();
            expect(resolvedValue).toEqual(123);
        });




    });
});

angular.module('beamer.controllers.signup', [])

.controller('SignupController', ["$scope", "auth", "$location",

    /** Creates user obj with form info and sends it off for authentication.*/
    function($scope, auth, $location) {

        $scope.signup = function() {
            if ($scope.user.pwd1 === $scope.user.pwd2) {
                var user = {
                    email: $scope.user.newEmail,
                    password: $scope.user.pwd1
                };
                auth.createNewUser(user).then(this.signupSuccess, this.signupErr);
            } else {
                $scope.error = "passwords don't match";
            }
        };
        $scope.login = function() {
            var user = {
                email: $scope.user.email,
                password: $scope.user.pwd
            };
            auth.loginUser(user).then(this.loginSuccess, this.loginError);
        };

        /** This parses the error and adds it to the scope to be shown*/
        this.signupErr = function(res) {
            var errorObj = res.data.err;
            var errors = Object.keys(errorObj.invalidAttributes);
            var length = errors.length;

            for (var i = 0; i < length; i++) {
                if (errors[i] == 'email') {
                    $scope.error = errorObj.invalidAttributes.email[0].message;
                }
            }
        };
        /** A successful signup routes view to profile*/
        this.signupSuccess = function(res) {
            console.log(res);
            $location.path("/profile");
        };
        /** Adds the login error to the scope to be shown*/
        this.loginError = function(res) {
            $scope.error = res.data.err;
        };
        /** A successful login routes view to profile*/
        this.loginSuccess = function(res) {
            console.log(res);
            $location.path("/profile");
        };
    }
]);

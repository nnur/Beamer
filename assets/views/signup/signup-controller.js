angular.module('seed-signup', [])


.controller('SignupController', ["$scope", "authService",
    function($scope, authService) {


        $scope.signup = function() {

            if ($scope.user.newPwd === $scope.user.pwd2) {

                var user = {
                    email: $scope.user.newEmail,
                    password: $scope.user.newPwd
                }

                authService.createNewUser(user);



            } else {

                alert("passwords don't match");
            }
        }


        $scope.login = function() {

            var user = {
                email: $scope.user.email,
                password: $scope.user.pwd
            }

            authService.loginUser(user);
        }

    }
]);
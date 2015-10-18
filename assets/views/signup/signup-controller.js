angular.module('beamer.controllers.signup', [])


.controller('SignupController', ["$scope", "auth",
    function($scope, authService) {


        $scope.signup = function() {

            if ($scope.user.newPwd === $scope.user.pwd2) {

                var user = {
                    email: $scope.user.newEmail,
                    password: $scope.user.newPwd
                };

                authService.createNewUser(user);



            } else {

                alert("passwords don't match");
            }
        };


        $scope.login = function() {

            var user = {
                email: $scope.user.email,
                password: $scope.user.pwd
            };

            authService.loginUser('po')
                .then(function(data) {
                    console.log("first fun", data);
                }, function(data) {
                    console.log("senodn fun", data);

                });
        };

    }
]);

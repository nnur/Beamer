angular.module('beamer.controllers.signup', [])


.controller('SignupController', ["$scope", "auth",
    function($scope, auth) {


        $scope.signup = function() {

            if ($scope.user.newPwd === $scope.user.pwd2) {

                var user = {
                    email: $scope.user.newEmail,
                    password: $scope.user.newPwd
                };

                auth.createNewUser(user).then(function(data) {
                    console.log(data);

                }, function(err) {
                    console.log(err);
                });



            } else {

                alert("passwords don't match");
            }
        };


        $scope.login = function() {

            var user = {
                email: $scope.user.email,
                password: $scope.user.pwd
            };

        };

    }
]);
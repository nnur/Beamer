angular.module('seed-signup', [])


.controller('SignupController', ["$scope", "$http", "$location",
    function($scope, $http, $location) {

        $scope.user = {
            newPwd: 'password',
            newEmail: 'email@gmail.com',
            pwd2: 'password'
        };



        $scope.signup = function() {

            if ($scope.user.newPwd === $scope.user.pwd2) {

                var user = {
                    email: $scope.user.newEmail,
                    password: $scope.user.newPwd
                }

                // send user info to server
                $http.post('http://localhost:1337/user/signup', user)
                    .success(SignupSuccess)
                    .error(SignupError);

            } else {

                alert("passwords don't match");
            }
        }


        $scope.login = function() {

            var user = {
                email: $scope.user.email,
                password: $scope.user.pwd
            }

            // send user info to server
            $http.post('http://localhost:1337/user/login', user)
                .success(LoginSuccess)
                .error(LoginError);
        }


        //====================== UTILITIES ======================//


        //Post signup error for invalid attributes
        function SignupError(data) {

            var errors = Object.keys(data.err.invalidAttributes);

            var length = errors.length;

            for (var i = 0; i < length; i++) {

                if (errors[i] == 'email') {

                    console.log(data.err.invalidAttributes);

                    alert(data.err.invalidAttributes.email[0].message);
                }

            }

        }

        function SignupSuccess(data) {

            console.log(data);
            $location.path("/profile");

        }

        //====================== Login ======================//


        function LoginSuccess(data) {

            console.log(data)
            $location.path("/profile");

        }

        function LoginError(data) {

            alert(data.err)
        }

    }
]);
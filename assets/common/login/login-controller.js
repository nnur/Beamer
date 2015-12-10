/**
 * Login Controller handles login and signup forms
 */
function LoginController($scope, auth, $location) {
    $scope.showButt = true;
    $scope.login = {};
    $scope.signup = {};

    // Creates user obj with form info and sends it off for authentication.
    $scope.signup = function() {
        var user = {
            username: $scope.user.username,
            email: $scope.user.newEmail,
            password: $scope.user.pwd1
        };

        //when a user signs in, it is automatically logged in
        auth.createNewUser(user)
            .then(loginSuccess, signupErr);
    };

    // Authenticates user credentials.
    $scope.login = (function() {
        // var user = {
        //     email: $scope.user.email,
        //     password: $scope.user.pwd
        // };

        // TODO:delete this ine, for testing only
        user = {
            email: 'dharness@uwo.ca',
            password: 'bluecakes'
        };
        auth.loginUser(user).then(loginSuccess, loginError);
    })();

    // This parses the error and adds it to the scope to be shown
    function signupErr(res) {
        var errorObj = res.data.err;
        var errors = Object.keys(errorObj.invalidAttributes);
        var length = errors.length;

        for (var i = 0; i < length; i++) {
            if (errors[i] == 'email') {
                $scope.signup.error = errorObj.invalidAttributes.email[0].message;
            }
        }
    }

    // Adds the login error to the scope to be shown
    function loginError(res) {
        $scope.login.error = res.data.err;
    }

    // A successful login routes view to profile
    function loginSuccess(res) {
        $location.path("/profile/" + res.user.username);
    }
}

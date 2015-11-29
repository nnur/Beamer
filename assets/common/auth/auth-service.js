angular.module('beamer.common.auth', ['beamer.common.session'])

.service('auth', ['$http', 'session', '$q',
    function($http, session, $q) {

        var root = 'http://localhost:1337';


        // Checks session expiry. Returns boolean
        this.isAuthenticated = function() {
            return session.isValid();
        };


        // Creates a new user at /signup and a new session with returned token.
        // Returns a promise.
        this.createNewUser = function(user) {
            var promise = $http({
                method: 'POST',
                url: root + '/user/signup',
                data: user
            }).then(function(res) {
                if (res.data.token) {
                    session.create(res.data.token);
                }
            });
            return promise;
        };

        // Posts user to /login and creates a session if 
        //         server responds with a token. Returns a promise.
        this.loginUser = function(user) {
            var promise = $http({
                method: 'POST',
                url: root + '/user/login',
                data: user
            }).then(function(res) {
                if (res.data.token) {
                    session.create(res.data.token);
                    return res;
                }
            });
            return promise;
        };

        // Destroys the session
        this.logout = function() {
            session.destroy();
        };
    }
]);

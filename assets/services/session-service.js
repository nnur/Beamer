angular.module('beamer.session', ['angular-jwt'])
    .service('session', ['jwtHelper', function(jwtHelper) {

        this.create = function(token) {
            this.expDate = jwtHelper.getTokenExpirationDate(token);
            this.userid = jwtHelper.decodeToken(token).id;
            this.token = token;
        };

        this.destroy = function() {
            this.expDate = null;
            this.userid = null;
            this.token = null;
        };

        this.isValid = function() {
            return jwtHelper.isTokenExpired(this.token);
        };

    }]);

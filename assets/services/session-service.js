angular.module('beamer.session', ['angular-jwt'])
    .service('session', ['jwtHelper', Session]);


function Session(jwtHelper) {
    this.jwtHelper_ = jwtHelper;
}

Session.prototype.create = function(token) {
    this.expDate = this.jwtHelper_.getTokenExpirationDate(token);
    this.userid = this.jwtHelper_.decodeToken(token).id;
    this.token = token;
};

Session.prototype.destroy = function() {
    this.expDate = null;
    this.userid = null;
    this.token = null;
};

Session.prototype.isValid = function() {
    return this.jwtHelper_.isTokenExpired(this.token);
}
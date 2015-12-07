module.exports = function(data, options) {

    // Get access to `req`, `res`, & `sails`
    var req = this.req;
    var res = this.res;

    // Set status code
    res.status(422);
    return res.send('Invalid login credentials');

};

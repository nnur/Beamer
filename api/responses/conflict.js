module.exports = function(data, options) {
    // Get access to `req`, `res`, & `sails`
    var req = this.req;
    var res = this.res;
    // Set status code
    res.status(409);
    return res.send('Conflict');
};

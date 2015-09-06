/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    restricted: function(req, res) {
        return res.ok('not cool');
    },
    open: function(req, res) {
        return res.ok(' cool');
    },
    jwt: function(req, res) {
        return res.ok('JWTS!');
    }
};
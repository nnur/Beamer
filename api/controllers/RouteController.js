/**
 * RouteController
 *
 * @description :: Server-side logic for managing Routecontrollers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    /**
     * `RouteController.create()`
     */
    createRoute: function(req, res) {
        var route = {
            name: req.body.name,
            owner: req.param('userid')
        };
        Route.create(route).then(function(data) {
            res.send(data);
        }).catch(function(err) {
            res.send(err);
        });
    },

    getBlogs: function(req, res) {
        Route.findOne({
            id: req.param('routeid')
        }).populate('blogs').exec(function(err, data) {
            if (data) {
                res.send(data.blogs);
            } else if (err) {
                res.send(err);
            }
        });
    },

    updateRoute: function(req, res) {
        Route.update({
            id: req.param('routeid')
        }, {
            name: req.body.name
        }).then(function(updated) {
            res.send(updated);
        }).catch(function(err) {
            res.send(err);
        });
    },

    /**
     * `RouteController.delete()`
     */
    deleteRoute: function(req, res) {
        Route.destroy({
            id: req.param('routeid')
        }).then(function(deleted) {
            res.send(deleted);
        }).catch(function(err) {
            res.send(err);
        });
    }
};

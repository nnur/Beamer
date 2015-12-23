/**
 * RouteController
 *
 * @description :: Server-side logic for managing Routecontrollers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    _config: {
        populate: false,
        restPrefix: '/user/:userid/',
        pluralize: false,
    },
    // gets the routes for a specific user
    getRoutes: function(req, res) {
        User.findOne({
                username: req.param('username')
            })
            .populate('routes')
            .exec(function(err, data) {
                res.send({
                    data: {
                        routes: data.routes
                    }
                });
            });
    },

    createRoute: function(req, res) {
        var UserId;
        User.getIdFromUsername(req.param('username'))
            .then(function(userId) {
                var route = {
                    routename: req.body.routename,
                    owner: userId
                };
                Route.create(route).then(function(createdRoute) {
                    res.send({
                        data: createdRoute
                    });
                }).catch(function(err) {
                    res.conflict();
                });
            });
    },

    updateRoute: function(req, res) {

        Route.update({
            routename: req.param('routename')
        }, {
            routename: req.body.routename
        }).then(function(updatedRoutes) {
            res.send(200, {
                data: updatedRoutes[0]
            });
        }).catch(function(err) {
            res.conflict();
        });
    },

    /**
     * `RouteController.delete()`
     */
    deleteRoute: function(req, res) {
        Route.destroy({
            routename: req.param('routename')
        }).then(function(deletedRoutes) {
            if (deletedRoutes.length === 0) return res.notFound();
            res.send({
                data: deletedRoutes[0]
            });
        }).catch(function(err) {
            res.send(err);
        });
    }
};

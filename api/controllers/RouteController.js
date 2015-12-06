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
        Route.find({
            owner: req.param('username')
        }, function(err, route) {
            if (err) {
                res.send(err);
            } else if (user) {
                res.send(route);
            }
        });
    },

    createRoute: function(req, res) {
        var route = {
            routename: req.body.routename,
            owner: req.param('username')
        };
        Route.create(route).then(function(data) {
            res.send(data);
        }).catch(function(err) {
            res.send(err);
        });
    },

    updateRoute: function(req, res) {

        // Route.find({
        //     routename: req.param('routename')
        // }).populate('blogs').exec(function(err, poison) {
        //     var route = poison.pop();
        //     _.each(route.blogs, function() {

        //     });
        //     route.routename = "OKAOKOAKOAKOAKOAKOAKOAKOAKOKASPPOOOOP"
        //     route.save();
        // })


        //TODO: find a better way to do this, can we remove some of these res.sends
        Route.update({
            routename: req.param('routename')
        }, {
            routename: req.body.routename
        }).then(function(updated) {
            res.send(updated);
        }).then(function() {

            Blog.update({
                owner: req.param('routename')
            }, {
                owner: req.body.routename
            }).then(function(updated) {
                res.send(updated);
            }).catch(function(err) {
                res.send(err);
            });

        }).catch(function(err) {
            res.send(err);
        });
    },

    /**
     * `RouteController.delete()`
     */
    deleteRoute: function(req, res) {
        Route.destroy({
            routename: req.param('routename')
        }).then(function(deleted) {
            res.send(deleted);
        }).catch(function(err) {
            res.send(err);
        });
    }
};

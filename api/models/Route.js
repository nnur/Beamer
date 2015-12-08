module.exports = {

    schema: true,

    attributes: {
        routename: {
            type: 'text',
            required: true,
            unique: true
        },
        blogs: {
            collection: 'blog',
            via: 'owner'
        },
        owner: {
            model: 'user'
        }
    },

    afterDestroy: function(deletedRoutes, next) {
        if (_.has(deletedRoutes[0], 'routename')) {
            Blog.destroy({
                owner: deletedRoutes[0].routename
            }).exec(function(err, deleted) {
                if (err) {
                    // TODO: fill this out, throw it?
                    // console.log(err);
                } else if (deleted) {
                    // console.log(deleted);
                }
            });
        }
        next();
    },
    getIdFromRoutename: function(routename) {
        return Route.findOne({
            routename: routename
        }).then(function(route) {
            return route.id;
        });
    }
};

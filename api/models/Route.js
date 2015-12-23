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
                owner: deletedRoutes[0].id
            }).exec(function(err, deleted) {
                next();
            });
        } else {
            next();
        }
    },
    getIdFromRoutename: function(routename) {
        return Route.findOne({
            routename: routename
        }).then(function(routes) {
            if (_.has(routes, 'id'))
                return routes.id;
        });
    }
};

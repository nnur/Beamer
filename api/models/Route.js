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
                    console.log(err);
                } else if (deleted) {
                    console.log(deleted);
                }
            });
        }
        next();
    },
    getRoutes: function() {

    }
};

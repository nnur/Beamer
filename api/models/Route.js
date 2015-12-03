module.exports = {

    schema: true,

    attributes: {
        name: {
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
        if (_.has(deletedRoutes[0], 'id')) {
            Blog.destroy({
                owner: deletedRoutes[0].id
            }).exec(function(err, deleted) {
                if (err) {
                    console.log(err);
                } else if (deleted) {
                    console.log(deleted);
                }
            });
        }
    }
};

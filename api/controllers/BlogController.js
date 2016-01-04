/**
 * BlogController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    // -----------CRUDDIN'-----------
    getBlogs: function(req, res) {
        Route.findOne({
                routename: req.param('routename')
            })
            .populate('blogs')
            .exec(function(err, data) {
                res.send({
                    data: {
                        blogs: data.blogs
                    }
                });
            });
    },

    getBlog: function(req, res) {
        Blog.findOne({
            id: req.param('blogid')
        }).exec(function(err, blog) {
            res.send({
                data: blog
            })
        });
    },
    createBlog: function(req, res) {
        Route.getIdFromRoutename(req.param('routename')).then(function(routeId) {
            var blog = {
                title: req.body.title,
                text: req.body.text,
                owner: routeId,
                author: req.param('username'),
                routename: req.param('routename')
            };
            Blog.create(blog).then(function(blog) {
                res.send({
                    data: blog
                });
            }).catch(function(err) {
                res.conflict();
            });
        });
    },


    updateBlog: function(req, res) {
        Blog.update({
            id: req.param('blogid')
        }, {
            text: req.body.text,
            title: req.body.title
        }).then(function(updated) {
            res.send({
                data: updated[0]
            });
        }).catch(function(err) {
            res.conflict();
        });
    },


    //delete blog
    deleteBlog: function(req, res) {
        Blog.destroy({
            id: req.param('blogid')
        }).then(function(deleted) {
            if (deleted.length === 0) return res.notFound();
            res.send({
                data: deleted[0]
            });
        }).catch(function(err) {
            res.send(err);
        });

    }

};

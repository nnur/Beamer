/**
 * BlogController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    // _config: {
    //     rest: true,
    //     populate: false,
    //     restPrefix: '/user/:userid/route/:routeid/',
    //     pluralize: true,
    // },
    // -----------CRUDDIN'-----------
    getBlogs: function(req, res) {
        Blog.find({
            owner: req.param('routename'),
            author: req.param('username')
        }, function(err, blog) {
            if (err) {
                res.send(err);
            } else if (user) {
                res.send(blog);
            }
        });
    },
    createBlog: function(req, res) {

        var blog = {
            title: req.body.title,
            text: req.body.text,
            owner: req.param('routename'),
            author: req.param('username')
        };
        Blog.create(blog).then(function(data) {
            res.send(data);
        }).catch(function(err) {
            res.send(err);
        });
    },


    updateBlog: function(req, res) {
        Blog.update({
            id: req.param('blogid')
        }, {
            text: req.body.text,
            title: req.body.title
        }).then(function(updated) {
            res.send(updated);
        }).catch(function(err) {
            res.send(err);
        });
    },


    //delete blog
    deleteBlog: function(req, res) {
        Blog.destroy({
            id: req.param('blogid')
        }).then(function(deleted) {
            res.send(deleted);
        }).catch(function(err) {
            res.send(err);
        });

    }

};

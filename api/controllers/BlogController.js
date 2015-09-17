/**
 * BlogController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


    create: function(req, res) {


        var userId = req.token.id;

        Blog.create(req.body).exec(function(err, blog) {
            if (err) {
                return res.json(err.status, {
                    err: err
                });
            }
            // If blog created successfuly
            if (blog) {

                blogManager.addBlog(userId, blog.id);

                res.json(200, {
                    blog: blog,

                });
            }
        });

    },

    retrieve: function(req, res) {

        var blog = blogManager.getBlog(req.body.id);
        if (blog) {
            res.send(blog);
        }
    },

    update: function(req, res) {





        var blog = blogManager.getBlog(req.body.id);

        if (blog) {

            console.log(blog);

            if (!blog.text) {

                blog.text = "";
            }

            blog.text = req.body.text;

            blog.save(function(err) {
                if (err) {

                    res.send(err);

                } else {
                    res.send(blog);
                }
            });



        } else if (err) {

            return res.json(err.status, {
                err: err
            });

        }

        //


    },

    delete: function(req, res) {

    }

    //end

};
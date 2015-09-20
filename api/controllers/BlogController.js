/**
 * BlogController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


    // -----------CRUDDIN'-----------

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

                //update user's blog list
                blogManager.addBlog(userId, blog.id, function(blog, err) {

                    if (blog) {
                        res.send(blog);
                    } else if (err) {
                        res.send(err);
                    }
                });


            }
        });

    },

    //get all blogs from a user
    getAllBlogs: function(req, res) {

        var userid = req.token.id;


        User.findOne({
            id: userid
        }, function(err, user) {

            if (err) {

                res.send(err);

            } else if (user) {

                if (!user.blogs) {
                    user.blogs = [];
                }

                res.send(user.blogs);
            }



        });

    },

    updateText: function(req, res) {

        var tokenid = req.token.id;
        var blogid = req.body.blogid;
        var userid = req.body.userid;

        //safety check
        if (userid == tokenid) {

            Blog.findOne({
                id: blogid
            }, function(err, blog) {
                if (blog) {

                    if (!blog.text) {

                        blog.text = "";
                    }

                    blog.text = req.body.text;

                    blog.save(function(error) {
                        if (error) {

                            res.send(error);

                        } else {
                            res.send(blog);
                        }
                    });

                } else {
                    res.send(err);
                }

            });

        }

    },

    delete: function(req, res) {


        var blogid = req.body.blogid;
        var userid = req.body.userid;

        //safety check
        if (userid == tokenid) {
            Blog.destroy({
                id: req.body.id
            }).exec(function deleteCB(err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send('The blog has been deleted');
                }
            });

        }

    }

    //end



};
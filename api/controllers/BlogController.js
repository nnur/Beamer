/**
 * BlogController
 *
 * @description :: Server-side logic for managing blogs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


    // -----------CRUDDIN'-----------

    create: function(req, res) {


        var tokenid = req.token.id;
        req.body.userid = tokenid;



        Blog.create(req.body).exec(function(err, blog) {
            if (err) {
                return res.json(err.status, {
                    err: err
                });
            }
            // If blog created successfuly
            if (blog) {

                //update user's blog list
                blogManager.addBlog(tokenid, blog.id, function(blog, err) {

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

        Blog.find()
            .where({
                userid: userid
            })
            .exec(function(err, blogs) {

                if (err) {
                    res.send(err);
                } else {
                    res.send(blogs);
                }

            });

    },

    updateText: function(req, res) {

        var tokenid = req.token.id;
        var blogid = req.body.blogid;


        Blog.findOne({
            id: blogid
        }, function(err, blog) {
            if (blog && blog.userid == tokenid) {

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

            } else if (err) {
                res.send(err);
            } else {
                res.send('could not update');
            }

        });



    },


    //tst userid
    delete: function(req, res) {


        var blogid = req.body.blogid;
        var tokenid = req.token.id;



        Blog.destroy({
            id: req.body.id,
            userid: tokenid

        }).exec(function deleteCB(err, blog) {
            if (err) {
                res.send(err);
            } else {

                res.send(blog);

                blogManager.deleteBlog(tokenid, blog.id);

            }
        });

    }

};
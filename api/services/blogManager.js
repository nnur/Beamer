 module.exports.addBlog = function(id, blog) {

     User.findOne({
         id: id
     }, function(err, user) {

         if (!user) {
             return res.json(401, {
                 err: 'the user does not exist'
             })
         } else {

             if (!user.blogs) {
                 user.blogs = [];

             }

             user.blogs.push(blog);

             user.save(function(err) {
                 if (err) {

                     return res.json(401, {
                         err: 'user not saved'
                     });

                 }
             });
         }

     });
 }

 module.exports.getBlog = function(id) {

     Blog.findOne({
             id: id
         },


         function(err, blog) {
             if (blog) {

                 return blog;
             } else if (err) {
                 res.send(err);
             }

         });

 }
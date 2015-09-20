 module.exports.addBlog = function(id, blog, cb) {

     User.findOne({
         id: id
     }, function(err, user) {

         if (err) {

             cb(null, err);
         } else if (user) {

             if (!user.blogs) {
                 user.blogs = [];
             }


             user.blogs.push(blog);

             user.save(function(err) {
                 if (err) {

                     cb(null, err);

                 }

                 cb(blog, null);
             });
         }

     });
 }



 module.exports.getBlog = function(userid, blogid, cb) {

     User.findOne({
         id: userid
     }, function(err, user) {

         if (err) {
             cb(null, err);
         } else if (user) {

             if (!user.blogs) {
                 user.blogs = [];

             }


             var size = user.blogs.length;

             for (var i = 0; i < size; i++) {

                 if (user.blogs[i].id == blogid) {
                     cb(user.blogs[i], null);
                 }
             }

         }

     });

 }
describe('User', function() {
    it.skip('should not be empty', function(done) {
        User.find().exec(function(err, users) {
            console.log(users);

            done();
        });
    });
});

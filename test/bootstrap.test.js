var Sails = require('sails'),
    sails = 'sdf';
var Barrels = require('barrels');


// good stuff
before(function(done) {

    // Increase the Mocha timeout so that Sails has enough time to lift.
    this.timeout(5000);

    Sails.lift({
        // configuration for testing purposes
        models: {
            connection: 'localDiskDb',
            migrate: 'drop'
        },
        connections: {
            localDiskDb: {
                adapter: 'sails-disk'
            }
        }
    }, function(err, server) {
        //sails = server;
        if (err) return done(err);
        done(err, sails);
    });
});

after(function(done) {
    // here you can clear fixtures, etc.
    Sails.lower(done);
});

module.exports = function(grunt) {

    grunt.config.set('sass', {
        dev: {
            options: {
                sourcemap: 'none',
                update: true
            },
            files: [{
                expand: true,
                cwd: 'assets/styles/',
                src: ['**/*.scss', '**/*.sass'],
                dest: '.tmp/public/styles/',
                ext: '.css'
            }]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
};

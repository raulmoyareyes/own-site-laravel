
var gulp = require('gulp');
var elixir = require('laravel-elixir');
var del = require('del');

elixir.extend("remove", function(path) {
    gulp.task("remove", function() {
        del(path);
    });
    return this.queueTask("remove");
});

elixir(function(mix) {

    /**
     * Commands
     * - gulp watch
     * - gulp --production
     */

    mix

    //.remove([ 'public/img/*', 'public/fonts/*', 'public/js/*', 'public/css/*' ])

    // LESS & CSS
        .less([

            "../vendor/normalize/normalize.less",
            "../vendor/font-awesome/font-awesome.less",

            "index/layout.less",
            "index/header.less",
            "index/footer.less",
            "index/blocks/about.less",
            "index/blocks/contact.less",
            "index/blocks/education.less",
            "index/blocks/experience.less",
            "index/blocks/portfolio.less",
            "index/blocks/skills.less"

        ], 'public/css/style.css')

        // JAVASCRIPT
        .scripts([

            "../vendor/jquery/jquery-1.11.3.js",
            "../vendor/jquery-ui/jquery-ui.min.js",
            "../vendor/mixitup/jquery.mixitup.min.js",

            "main.js"

        ], 'public/js/main.js')

        // IMAGES & FONTS
        .copy( 'resources/assets/img', 'public/img' )
        .copy( 'resources/assets/docs', 'public/docs' )
        .copy( 'resources/assets/fonts', 'public/fonts' );

});
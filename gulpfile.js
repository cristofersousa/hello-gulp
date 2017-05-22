/* Configurações para o projeto */
    var views = '*.html',

    // Arquivos SASS/SCSS
    styles = ['sass/**/*.sass', 'sass/**/*.scss'],
    // Diretório de CSS
    css_folder = 'css',
    // Nome do arquivo CSS minificado
    css_min = 'styles.min.css',
    // Nome do arquivo SASS principal
    css_main = 'sass/main.scss',

    // Arquivos JS
    scripts = ['js/**/*.js', '!js/scripts.min.js'],
    // Diretórios de scripts
    scripts_folder = 'js',
    // Nome do arquivo JS minificado
    scripts_min = 'scripts.min.js',

    // Arquivos JPG/PNG
    images = ['img/**/*.jpg', 'img/**/*.png'],
    // Diretório de imagens
    images_folder = 'img',

    /* Configurações para o projeto */

    /* Atribui cada plugin a uma variável */

    // Gulp
    gulp = require('gulp'),

    // Junta arquivos
    concat = require('gulp-concat'),

    // Minifica imagens
    imagemin = require('gulp-imagemin'),

    // Compila SASS/Compass
    sass = require('gulp-sass'),

    // Minifica CSS
    minifycss = require('gulp-minify-css'),

    // Auto-prefixa CSS
    autoprefixer = require('gulp-autoprefixer'),

    // Controla a qualidade do JavaScript
    jshint = require('gulp-jshint'),

    // Minifica JavaScript
    uglify = require('gulp-uglify'),

    // Só roda tarefa em arquivos modificados
    changed = require('gulp-changed'),

    // LiveReload
    refresh = require('gulp-livereload'),

    // Optimiza estilos e scripts por comentários
    usemin = require('gulp-usemin'),

    // Controla qualidade do CSS
    csslint = require('gulp-csslint'),

    // Corrige erros de pipe
    plumber = require('gulp-plumber'),

    // Servidor de LiveReload
    server = require('tiny-lr')();

/* Tarefas de estilo */
gulp.task('style', function() {
    gulp.src(css_main)
        .pipe(plumber())
        .pipe(sass())
        .pipe(concat(css_min))
        .pipe(minifycss())
        .pipe(csslint())
        .pipe(csslint.reporter())
        .pipe(gulp.dest(css_folder))
        .pipe(refresh(server));
});

/* Tarefas de views */
gulp.task('view', function() {
    gulp.src(views)
        .pipe(refresh(server));
});

/* Tarefas de imagens */
gulp.task('image', function() {
    gulp.src(images)
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest(images_folder))
        .pipe(refresh(server));
});

/* Tarefas de JavaScript */
gulp.task('script', function() {
    gulp.src(scripts)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat(scripts_min))
        .pipe(uglify())
        .pipe(gulp.dest(scripts_folder))
        .pipe(refresh(server));
});

/* Tarefa Default */
gulp.task('default', function() {
    server.listen(35729, function(err) {
        if (err) return console.log(err);
        gulp.watch(styles, ['style']);
        gulp.watch(views, ['view']);
        gulp.watch(images, ['image']);
        gulp.watch(scripts, ['script']);
    });
});

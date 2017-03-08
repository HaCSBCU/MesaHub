var gulp = require('gulp');

var gulp = require('gulp');

var sass = require('gulp-sass');

gulp.task('sass', function(){
   gulp.src('scss/**/*.scss').pipe(sass()).pipe(gulp.dest('public/stylesheets/css'))
});

gulp.task('watch', function(){
   gulp.watch('scss/**/*.scss', ['sass']);
});

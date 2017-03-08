var gulp = require('gulp');

var gulp = require('gulp');

var sass = require('gulp-sass');

gulp.task('sass', function(){
   gulp.src('scss/**/*.scss').pipe(sass()).pipe(gulp.dest('public/stylesheets/css'))
});

gulp.task('watch', function(){
   gulp.start('sass');
   gulp.watch('scss/**/*.scss', ['sass']);
});

gulp.task('ssh-add', function(cb){
   var exec = require('child_process').exec;
   exec('ssh-add -K /Users/TheWebCreator/.ssh/id_rsa', function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
   });
});

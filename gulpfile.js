var electron = require('electron-prebuilt');
var gulp = require('gulp');
var path = require('path');
var proc = require('child_process');

gulp.task('default', ['serve:electron']);

gulp.task('serve:electron', function() {
  serve(electron, [__dirname]);
});

gulp.task('serve:app', function() {
  serve('node', [path.resolve(__dirname, 'app', 'main.js')]);
});

function serve(exe, args, options) {
  proc.spawn(exe, args, Object.assign({ stdio: 'inherit' }, options));
}
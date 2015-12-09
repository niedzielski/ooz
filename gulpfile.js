var browserSync = require('browser-sync');
var electron = require('electron-prebuilt');
var gulp = require('gulp');
var proc = require('child_process');
var url = require('url');

gulp.task('default', ['serve:electron']);

gulp.task('serve:electron', function() {
  var bs = browserSync({
    open: false,
    server: {
      baseDir: 'app',
      index: 'page/index.html',
      routes: {
        '/bower_components': 'bower_components',
        '/node_modules': 'node_modules'
      }
    }
  });
  
  var uri = url.format({
    protocol: 'http',
    hostname: 'localhost',
    port: bs.getOption('port')
  });
  process.stdout.write(uri + '\n'); // rempve
  serve(electron, [__dirname, '--url=' + uri]);
});

function serve(exe, args, options) {
  proc.spawn(exe, args, Object.assign({ stdio: 'inherit' }, options));
}
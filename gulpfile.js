
var uglify = require('uglify-js');
var fs = require('fs-extra');
var path = require('path');
var gulp = require('gulp');
var Duo = require('duo');

var FILENAME = 'skiplink.js';
var DIST = 'dist';

gulp.task('default', ['compress']);

gulp.task('clean', function () {
  fs.emptyDirSync(DIST);
  fs.ensureDirSync(DIST);
});

gulp.task('build', ['clean'], function (done) {
  Duo(__dirname)
  .entry('index.js')
  .global('Skiplink')
  .run(function (err, res) {
    if (err) throw err;

    var file = path.join(DIST, FILENAME);
    var out = res.code;

    fs.ensureDir(DIST, function (err) {
      if (err) throw err;

      fs.writeFile(file, out, 'utf8', function (err) {
        if (err) throw err;

        console.log('  wrote ' + file);
        done();
      });
    });
  });
});

gulp.task('compress', ['build'], function (done) {
  var srcPath = path.join(DIST, FILENAME);
  var outPath = path.join(DIST, 'skiplink.min.js');
  var minJs = uglify.minify(srcPath).code;

  fs.writeFile(outPath, minJs, 'utf8', function (err) {
    if (err) throw err;

    console.log('  copied ' + srcPath + ' > ' + outPath);
    done();
  });
});

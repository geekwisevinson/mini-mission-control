const gulp = require('gulp');
const apidoc = require('gulp-api-doc');
const mocha = require('gulp-spawn-mocha');
const shell = require('gulp-shell');
const nodemon = require('gulp-nodemon');
const nodeInspector = require('gulp-node-inspector');

const args = require('yargs').argv;

gulp.task('apidoc', () => gulp.src('controllers')
  .pipe(apidoc())
  .pipe(gulp.dest('doc'))
);

gulp.task('test', (args.debug) ? ['inspect'] : null, () => {
  const options = {
    require: ['co-mocha'],
    timeout: 1000,
    globals: [
      'testApp',
    ],
  };

  if (args.debug) {
    options.debug = true;
  }

  return gulp.src(['test/boot.js', 'test/**/*_test.js'], { read: false })
    .pipe(mocha(options))
    .once('error', () => {
      process.exit(1);
    })
    .once('end', () => {
      process.exit();
    });
  }
);

gulp.task('inspect', () => {
  gulp
    .src([])
    .pipe(nodeInspector({ preload: true }))
    .once('error', () => {
      process.exit(1);
    })
    .once('end', () => {
      process.exit();
    });
  }
);

gulp.task('serve', (args.debug) ? ['inspect'] : null, () => {
  const nodeArgs = [];
  if (args.debug) {
    nodeArgs.push('--debug');
  }

  nodemon({
    script: 'index.js',
    ext: 'js',
    nodeArgs,
    ignore: [
      'node_modules/',
      'test',
    ],
  });
});

gulp.task('serve-docs', shell.task('cd doc; python -m SimpleHTTPServer'));

// gulp.task('default', ['apidoc', 'serve']);
gulp.task('default', ['serve']);

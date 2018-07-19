'use strict';
// Const path = require('path');
const assert = require('yeoman-assert');
// Const helpers = require('yeoman-test');

describe('generator-gulp-simple-static:app', () => {
  // BeforeAll(() => {
  //   return helpers.run(path.join(__dirname, '../generators/app'));
  // });

  it('creates files', () => {
    assert.file(['index.html']);
  });
});

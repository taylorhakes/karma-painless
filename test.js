var painless = require('painless');
var assert = painless.assert;
var test = painless.createGroup('group name');

test('sync 1', function() {
  assert.deepEqual({ a: 'b' }, {a: 'c'});
});

test('sync 2', function() {
  assert(false);
});
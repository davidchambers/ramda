var assert = require('assert');

var R = require('..');


var as = [[1], [3, 4]];
var bs = [[1, 2], [3]];
var cs = [[1, 2], [3, 4]];


describe('commute', function() {
  it('"pivots" a list (list of functors => functor of a list)', function() {
    assert.deepEqual(R.commute(R.of, as), [[1, 3], [1, 4]]);
    assert.deepEqual(R.commute(R.of, bs), [[1, 3], [2, 3]]);
    assert.deepEqual(R.commute(R.of, cs), [[1, 3], [2, 3], [1, 4], [2, 4]]);
  });

  it('works on Algebraic Data Types such as "Maybe"', function() {
    function Identity(x) {
      if (!(this instanceof Identity)) {
        return new Identity(x);
      }
      this.value = x;
    }
    Identity.prototype.ap = function(x) {
      return Identity(this.value(x.value));
    };
    Identity.prototype.map = function(f) {
      return Identity(f(this.value));
    };
    Identity.prototype.toString = function() {
      return 'Identity(' + R.toString(this.value) + ')';
    };

    assert.strictEqual(
      R.toString(R.commute(Identity, [Identity(3), Identity(4), Identity(5)])),
      'Identity([3, 4, 5])'
    );
  });

  it('is curried', function() {
    var cmtArr = R.commute(R.of);
    assert.strictEqual(typeof cmtArr, 'function');
    assert.deepEqual(cmtArr(as), [[1, 3], [1, 4]]);
    assert.deepEqual(cmtArr(bs), [[1, 3], [2, 3]]);
    assert.deepEqual(cmtArr(cs), [[1, 3], [2, 3], [1, 4], [2, 4]]);

  });
});

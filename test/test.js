var linear = require("../gauss-jordan.js");
var assert = require('assert');

describe('linear', function() {
  describe('#solve()', function() {
    it('should solve linear systems', function() {
      assert.deepEqual([1,2], linear.solve([[1,2],[3,4]], [5,11]));
    });
  });

  describe('#invert()', function() {
    it('sould invert matrices', function() {
      assert.deepEqual([[1, -2],
                        [0, 1]],
                      linear.invert([[1, 2],
                                     [0, 1]]));
    });
    it('should throw with singular matrices', function() {
      assert.throws(function() {
        linear.invert([[1,1],[1,1]]);
      }, /singular/);
    });
  });
});


var linear = require("../gauss-jordan.js");
var assert = require('assert');

describe('linear', function() {
  describe('#solve()', function() {
    it('should solve linear systems', function() {
      assert.deepEqual([1,2], linear.solve([[1,2],[3,4]], [5,11]));
    });
    it('should solve underdeterminated systems', function () {
      // See issue #1
      var matrix = [
          [-1, 1, 0, 0, 0, -1, 0, 0],
          [0, -1, 1, 0, 0, 0, -1, 0],
          [0, 0, 1, -1, 0, -1, 0, 0],
          [-1, 0, 0, 1, 0, 0, -1, 0],
          [-1, 0, 0, 0, 1, 0, 0, -1],
          [0, 0, 1, 0, -1, 0, 0, -1],
          [ 1, 0, 0, 0, 0, 0, 0, 0],
          [ 0, 0, 1, 0, 0, 0, 0, 0]];
      var result = [0, 0, 0, 0, 0, 0, 2, 6];
      var x = linear.solve(matrix, result);
      // assert that: result = matrix * x
      for (var lin=0; lin<matrix.length; lin++) {
        var tmp = 0;
        for (var col=0; col<matrix[lin].length; col++) {
          tmp += matrix[lin][col] * x[col];
        }
        assert.equal(tmp, result[lin], 'line '+lin+' matches');
      }
    });
    it('should throw with systems without any solution', function () {
      assert.throws(function(){
        linear.solve([[1,0,0],[0,0,1],[0,0,2]], [1,1,1])
      });
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

  describe('GH issue #2 regression test', function() {
    it('should invert a matrix where a column is all <= 0, with 0 in last row', function() {
      assert.doesNotThrow(function() {
        linear.invert([ [ -4, 10 ], [ 0, -0.5 ] ])
      })
    })
  })
});


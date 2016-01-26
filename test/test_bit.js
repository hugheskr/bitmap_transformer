var bit = require(__dirname + '/../lib/bitmapdatareader.js');
var expect = require('chai').expect;

describe('transforming function', function() {
  it('should loop through buffer', function() {
    var testArr = [1, 2, 3];
    expect(bit.transforming(0, testArr)).to.eql([254, 253, 252]);
  });
});


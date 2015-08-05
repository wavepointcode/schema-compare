'use strict';

var cmp = require('./index');
var inspect = require('util').inspect,
    format = require('util').format;

require('should');

var things = [void 0, null, true, false, 0, 1, '', 'foo', [ ], { }];

things.filter(function (thing) {
  return !thing || typeof thing !== 'object';
}).length.should.equal(things.length-2);

function genThings(cb) {
  things.filter(function (thing) {
    return !thing || typeof thing !== 'object';
  }).forEach(function (thing1) {
    things.forEach(function (thing2) {
      things.forEach(function (thing3) {
        cb(thing1, thing2, thing3);
      });
    });
  });
};

describe('schema-compare', function () {
  describe('simple values', function () {
    genThings(function (thing1, thing2, thing3) {
      var str = format(
        'cmp(%s, %s, %s) should equal %s',
        inspect(thing1),
        inspect(thing2),
        inspect(thing3),
        inspect(thing2===thing3)
      );
      it(str, function () {
        cmp(thing1, thing2, thing3).should.equal(thing2===thing3);
      });
    });
  });
  describe('simple values in arrays', function () {
    genThings(function (thing1, thing2, thing3) {
      var str = format(
        'cmp(%s, %s, %s) should equal %s',
        inspect([thing1]),
        inspect([thing2]),
        inspect([thing3]),
        inspect(thing2===thing3)
      );
      it(str, function () {
        cmp([thing1], [thing2], [thing3]).should.equal(thing2===thing3);
      });
    });
  });
  describe('simple values in objects', function () {
    genThings(function (thing1, thing2, thing3) {
      var str = format(
        'cmp(%s, %s, %s) should equal %s',
        inspect({'foo':thing1}),
        inspect({'foo':thing2}),
        inspect({'foo':thing3}),
        inspect(thing2===thing3)
      );
      it(str, function () {
        cmp({'foo':thing1}, {'foo':thing2}, {'foo':thing3}).should.equal(thing2===thing3);
      });
    });
  });
  describe('arrays in arrays', function () {
    genThings(function (thing1, thing2, thing3) {
      var str = format(
        'cmp(%s, %s, %s) should equal %s',
        inspect([[thing1]]),
        inspect([[thing2]]),
        inspect([[thing3]]),
        inspect(thing2===thing3)
      );
      it(str, function () {
        cmp(
          [[thing1]],
          [[thing2]],
          [[thing3]]
        ).should.equal(thing2===thing3);
      });
    });
  });
  describe('objects in arrays', function () {
    genThings(function (thing1, thing2, thing3) {
      var str = format(
        'cmp(%s, %s, %s) should equal %s',
        inspect([{'foo':thing1}]),
        inspect([{'foo':thing2}]),
        inspect([{'foo':thing3}]),
        inspect(thing2===thing3)
      );
      it(str, function () {
        cmp(
          [{'foo':thing1}],
          [{'foo':thing2}],
          [{'foo':thing3}]
        ).should.equal(thing2===thing3);
      });
    });
  });
  describe('arrays in objects', function () {
    genThings(function (thing1, thing2, thing3) {
      var str = format(
        'cmp(%s, %s, %s) should equal %s',
        inspect({'foo':[thing1]}),
        inspect({'foo':[thing2]}),
        inspect({'foo':[thing3]}),
        inspect(thing2===thing3)
      );
      it(str, function () {
        cmp(
          {'foo':[thing1]},
          {'foo':[thing2]},
          {'foo':[thing3]}
        ).should.equal(thing2===thing3);
      });
    });
  });
  describe('objects in objects', function () {
    genThings(function (thing1, thing2, thing3) {
      var str = format(
        'cmp(%s, %s, %s) should equal %s',
        inspect({'foo':{'bar':thing1}}),
        inspect({'foo':{'bar':thing2}}),
        inspect({'foo':{'bar':thing3}}),
        inspect(thing2===thing3)
      );
      it(str, function () {
        cmp(
          {'foo':{'bar':thing1}},
          {'foo':{'bar':thing2}},
          {'foo':{'bar':thing3}}
        ).should.equal(thing2===thing3);
      });
    });
  });
  describe('empty array in schema', function () {
    it('cmp([], 1, 1) should equal true', function () {
      cmp([], [1], [1]).should.equal(true);
    });
    it('cmp([], 1, 0) should equal false', function () {
      cmp([], [1], [0]).should.equal(false);
    });
  });
  describe('array length mismatch', function () {
    it('cmp([], [1], [1, 1]) should equal false', function () {
      cmp([], [1], [1, 1]).should.equal(false);
    });
  });
  describe('object key mismatch', function () {
    it("cmp({'foo':1}, {'foo':1}, {'bar':1}) should equal false", function () {
      cmp({'foo':1}, {'foo':1}, {'bar':1}).should.equal(false);
    });
  });
  describe('object keys not in schema', function () {
    it("cmp({'foo':1}, {'foo':1, 'bar':2}, {'foo':1, 'bar':3}) should equal true", function () {
      cmp({'foo':1}, {'foo':1, 'bar':2}, {'foo':1, 'bar':3}).should.equal(true);
    });
  });
});

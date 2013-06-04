/*
 * -------------------------------------------------------------------------------
 * test.index.js
 *
 * Test the fortunes module.
 * -------------------------------------------------------------------------------
 */

var should = require('should')
  , _ = require('underscore')
  , f = require('../index')
  , timeout = 5000
  ;

describe('Fortune tests:', function() {

  describe('Search:', function() {

    it('no options sent, all defaults', function(done) {
      this.timeout(timeout);
      f.search(function(results) {
        results.should.be.an.instanceOf(Array);
        should.strictEqual(results.length, 10);
        done();
      });
    });

    it('max test, wildcard search', function(done) {
      this.timeout(timeout);
      var options = {}
        ;

      options.max = 22;

      f.search(options, function(results) {
        results.should.be.an.instanceOf(Array);
        should.strictEqual(results.length, options.max);
        done();
      });
    });

    it('max test, word search', function(done) {
      this.timeout(timeout);
      var options = {}
        ;

      options.max = 4;
      options.term = 'men';

      f.search(options, function(results) {
        results.should.be.an.instanceOf(Array);
        should.strictEqual(results.length, options.max);
        done();
      });
    });

    it('short fortunes only, wildcard search', function(done) {
      this.timeout(5000);
      var options = {}
        , maxLen = 0
        , maxShortLen = 0
        ;

      options.max = 200;
      f.search(options, function(results) {
        for (var i = 0; i < results.length; i++) {
          if (results[i].length > maxLen) {
            maxLen = results[i].length;
          }
        }

        options.isShort = true;
        f.search(options, function(results2) {
          for (var i = 0; i < results2.length; i++) {
            if (results2[i].length > maxShortLen) {
              maxShortLen = results2[i].length;
            }
          }
          (maxLen >= maxShortLen).should.be.true;
          done();
        });
      });
    });

    it('short fortunes only, word search', function(done) {
      this.timeout(5000);
      var options = {}
        , maxLen = 0
        , maxShortLen = 0
        ;

      options.max = 200;
      options.term = 'men';
      f.search(options, function(results) {
        for (var i = 0; i < results.length; i++) {
          if (results[i].length > maxLen) {
            maxLen = results[i].length;
          }
        }

        options.isShort = true;
        f.search(options, function(results2) {
          for (var i = 0; i < results2.length; i++) {
            if (results2[i].length > maxShortLen) {
              maxShortLen = results2[i].length;
            }
          }
          (maxLen >= maxShortLen).should.be.true;
          done();
        });
      });
    });

    it('search within category', function(done) {
      this.timeout(5000);
      var options = {}
        , cats = ['sports']
        ;

      options.categories = cats;
      f.search(options, function(results) {
        //for (var i = 0; i < results.length; i++) {
          //console.log(results[i]);
          //console.log('-----');
        //}

        // --------------------------------------------------------
        // So, how do you write a good test for this?
        // --------------------------------------------------------
        done();
      });
    });

    it('search returns no duplicates', function(done) {
      this.timeout(5000);
      var options = {}
        ;

      options.max = 1000;
      options.categories = ['sports'];
      f.search(options, function(results) {
        var unique = _.uniq(results);
        (unique.length === results.length).should.be.true;
        done();
      });
    });

  });

  describe('Random', function() {

    it('random with no options', function(done) {
      this.timeout(5000);
      f.random(function(result) {
        result.should.be.a('string');
        done();
      });
    });

    it('random with options', function(done) {
      this.timeout(5000);
      var options = {}
        ;

      options.isShort = true;
      options.term = 'men';
      f.random(options, function(result) {
        result.should.be.a('string');
        / men /i.test(result).should.be.true;
        result.length.should.be.below(161);
        done();
      });
    });
  });

});


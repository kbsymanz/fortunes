/*
 * -------------------------------------------------------------------------------
 * test.index.js
 *
 * Test the fortunes module.
 * -------------------------------------------------------------------------------
 */

var should = require('should')
  , f = require('../index')
  ;

describe('Fortune tests:', function() {
  describe('Configuration:', function() {
    it('Set max returned', function(done) {
      var max = 12
        ;

      f.reset();
      f.setMax(max);
      f.getMax().should.equal(max);
      done();
    });

    it('Reset to defaults', function(done) {
      var max = 8
        , categories = ['startrek', 'sports']
        ;

      f.reset();
      f.setMax(max);
      f.setShort(true);
      f.setCategories(categories);

      f.reset();
      f.getMax().should.equal(10);
      f.getShort().should.be.false;
      f.getCategories().should.eql([]);
      done();
    });

    it('Set categories', function(done) {
      var categories = ['pets', 'science', 'sports']
        ;

      f.reset();
      f.setCategories(categories);
      f.getCategories().should.includeEql(categories[0]);
      f.getCategories().should.includeEql(categories[1]);
      f.getCategories().should.includeEql(categories[2]);
      done();
    });

    it('Set short only', function(done) {
      f.reset();
      f.getShort().should.be.false;
      f.setShort(true);
      f.getShort().should.be.true;
      f.setShort(false);
      f.getShort().should.be.false;
      done();
    });
  });

  describe('Search:', function() {
    it('Search results limited by max, no search term', function(done) {
      var max = 22
        ;

      f.reset();
      f.setMax(max);
      f.search(function(results) {
        results.should.be.an.instanceOf(Array);
        should.strictEqual(results.length, max);
        done();
      });
    });

    it('Search results limited by max, with search term', function(done) {
      var max = 6
        , term = 'men'
        ;

      f.reset();
      f.setMax(max);
      f.search(term, function(results) {
        results.should.be.an.instanceOf(Array);
        should.strictEqual(results.length, max);
        done();
      });
    });

    it('Search results limited by short, no search term', function(done) {
      var maxLen = 0
        , maxShortLen = 0
        ;

      f.reset();
      f.search(function(results) {
        for (var i = 0; i < results.length; i++) {
          if (results[i].length > maxLen) {
            maxLen = results[i].length;
          }
        }

        f.setShort(true);
        f.search(function(results2) {
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

    it('Search results limited by short, with search term', function(done) {
      var maxLen = 0
        , maxShortLen = 0
        , term = 'men'
        ;

      f.reset();
      f.search(term, function(results) {
        for (var i = 0; i < results.length; i++) {
          if (results[i].length > maxLen) {
            maxLen = results[i].length;
          }
        }

        f.setShort(true);
        f.search(term, function(results2) {
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

    it('Search results limited by category', function(done) {
      var cats = ['medicine', 'linux', 'work']
        ;

      f.reset();
      f.setCategories(cats);
      f.search(function(results) {
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

  });

  //describe('Random', function() {
    //it('Get back one random fortune', function(done) {
      //f.random(function(result) {
        //result.should.be.an.instanceOf(String);
        //console.log(result);
        //done();
      //});
    //});

  //});

});


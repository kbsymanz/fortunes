/* 
 * -------------------------------------------------------------------------------
 * fortunes.js
 *
 * Interface to the fortunes package for Linux.
 * ------------------------------------------------------------------------------- 
 */

var spawn = require('child_process').spawn
  ;

// --------------------------------------------------------
// Set the module defaults. This is what the reset() sets
// the values back to as well.
//
// max: the maximum number of fortunes to return in searches.
// categories: the categories to search. [] means everything.
// isShort: whether to return only short fortunes or not.
// --------------------------------------------------------
var maxDefault = 10
  , max = maxDefault
  , categoriesDefault = []
  , categories = categoriesDefault
  , isShortDefault = false
  , isShort = isShortDefault
  ;

module.exports.reset = function() {
  max = maxDefault;
  categories = categoriesDefault;
  isShort = isShortDefault;
};

module.exports.setMax = function(m) {
  max = m;
};

module.exports.getMax = function() {
  return max;
};

module.exports.setCategories = function(cats) {
  categories = cats;
};

module.exports.getCategories = function() {
  return categories;
};

module.exports.setShort = function(s) {
  isShort = s;
};

module.exports.getShort = function() {
  return isShort;
};

module.exports.search = function(term, callback) {
  var fortuneCmd
    , searchArgs = ['-eim']
    , shortArg = ['-s']
    , catArgs = categories
    , cmdArgs = []
    , data = []
    , fortunes
    ;

  callback = (callback || term);
  if (term !== callback) {
    searchArgs.push(' ' + term + ' ');
  } else {
    searchArgs.push('');
  }

  if (isShort) {
    cmdArgs = cmdArgs.concat(shortArg);
  }
  cmdArgs = cmdArgs.concat(searchArgs, catArgs);

  fortuneCmd = spawn('fortune', cmdArgs);

  fortuneCmd.stdout.on('data', function(d) {
    data.push(d);
  });

  fortuneCmd.on('close', function(code) {
    var choices = []
      , choice
      , returnVal = []
      ;

    fortunes = Buffer.concat(data).toString().split('\n%\n');
    while (true) {
      choice = Math.floor(Math.random() * fortunes.length);
      if (choice in choices) {
        continue;
      }
      choices.push(choice);
      if (choices.length == max) {
        break;
      }
    }
    for (var i = 0; i < choices.length; i++) {
      returnVal.push(fortunes[choices[i]]);
    }
    callback(returnVal);
  });
};

module.exports.random = function() {


};


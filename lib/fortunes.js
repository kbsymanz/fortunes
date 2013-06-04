/* 
 * -------------------------------------------------------------------------------
 * fortunes.js
 *
 * Interface to the fortunes package for Linux.
 * ------------------------------------------------------------------------------- 
 */

var _ = require('underscore')
  , spawn = require('child_process').spawn
  ;

// --------------------------------------------------------
// Default values.
// --------------------------------------------------------
var maxDefault = 10
  , categoriesDefault = []
  , isShortDefault = false
  ;

/* --------------------------------------------------------
 * search()
 *
 * Searches for fortunes meeting the specified criteria.
 *
 * Allowable options properties:
 *    max: (int) the maximum number of results to return
 *    term: (string) the must exist in any results returned
 *    isShort: (boolean) whether only short fortunes are returned
 *    categories: (array) with strings representing the categories to search
 *
 * param       options (optional)
 * param       callback
 * return      undefined
 * -------------------------------------------------------- */
module.exports.search = function(options, callback) {
  var fortuneCmd
    , max = maxDefault
    , isShort = isShortDefault
    , searchArgs = ['-eim']
    , shortArg = ['-s']
    , catArgs = categoriesDefault
    , cmdArgs = []
    , data = []
    , fortunes
    ;

  callback = (callback || options);
  if (options === callback) {
    options = {};
  }
  if ('term' in options) {
    searchArgs.push(' ' + options.term + ' ');
  } else {
    searchArgs.push('');
  }
  if ('max' in options && options.max > 0) {
    max = options.max;
  }
  if ('isShort' in options) {
    cmdArgs = cmdArgs.concat(shortArg);
  }
  if ('categories' in options) {
    catArgs = options.categories;
  }

  cmdArgs = cmdArgs.concat(searchArgs, catArgs);

  fortuneCmd = spawn('fortune', cmdArgs);

  fortuneCmd.stdout.on('data', function(d) {
    data.push(d);
  });

  fortuneCmd.on('close', function(code) {
    var choices = []
      , choice
      , uFortunes
      , returnVal = []
      ;

    fortunes = Buffer.concat(data).toString().split('\n%\n');
    uFortunes = _.uniq(fortunes);
    max = max > uFortunes.length? uFortunes.length: max;
    while (true) {
      choice = Math.floor(Math.random() * uFortunes.length);
      if (!~ _.indexOf(choices, choice)) {
        choices.push(choice);
        if (choices.length === max) {
          break;
        }
      }
    }
    for (var i = 0; i < choices.length; i++) {
      returnVal.push(uFortunes[choices[i]]);
    }
    callback(returnVal);
  });
};

/* --------------------------------------------------------
 * random()
 *
 * Returns a single fortune as a string. Pass options to
 * specify short or categories or fortunes with a certain
 * word in them.
 *
 * param       options (optional)
 * param       callback
 * return      undefined
 * -------------------------------------------------------- */
module.exports.random = function(options, callback) {

  callback = (callback || options);
  if (options === callback) {
    options = {};
  }
  options.max = 1;

  module.exports.search(options, function(result) {
    var retVal = result? result[0]: '';
    callback(retVal);
  });
};


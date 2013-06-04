# Fortunes

_Interface to the fortune package installed on Linux (tested against Ubuntu 12.04)._

Provides a simple interface to the fortune program and data in Linux. Allows for searching for fortunes based upon:

- search term
- short fortunes or not
- specific categories

Also allows the maximum number of fortunes returned to be specified.

## Prerequisites

The fortune program needs to be installed in order for this module to work because this module uses spawn to run the fortune program in order to get the data.

On Ubuntu, you install it like this:

    sudo apt-get install fortune-mod

## Installation

    npm install fortunes

## Usage

    var fortunes = require('fortunes');
    var options = {
        isShort: true,
        max: 5,
        term: 'men',
        categories: ['computers', 'love', 'people']
    };
    fortunes.search(function(results) {
        // default options are used
    });
    fortunes.search(options, function(results) {
        // do something with the results which are an array of strings
    });
    fortunes.random(function(fortune) {
        // default options, only one result (string) is returned
    });
    fortunes.random(options, function(fortune) {
        // options specified but still only one result (string) is returned
    });

## API

### search

Parameters:

- options: optional object specifying search options.
- callback: non-optional callback.

Valid options are:

- term: the word to search for (case-insensitive search using white-space delimiter)
- max: the maximum number of fortunes to return
- isShort: whether only short fortunes are returned. "Short" is based upon the fortune program implementation (Ubuntu Linux fortune-mod package is 160 characters maximum).
- categories: an array of strings corresponding to the fortune categories to use. These correspond to the various files in the fortune data directory.

Default options are:

- term: ''
- max: 10
- isShort: false
- categories: [] (which means all categories)

### random

The ```random()``` function is sugar for the ```search()``` function. Parameters and valid options are the same as for search with the exception that max is always 1 and cannot be over-ridden.

Note that an array is not returned for ```random()```. Instead, a string containing the one fortune is returned.

## Testing

    mocha test/test.index.js

## Purpose

I personally needed a module that would provide me data for some other testing of some client-side applications. Using fortunes seemed like a reasonably interesting idea with lots of data to search and use. Your mileage may vary.

## Future

The current implementation uses spawn to interface with the fortune program which means that the fortune program needs to be installed as a prerequisite. I don't have any plans to change this right now because it meets my needs and it was the path of least resistance. But it would be nice to not have this dependency.

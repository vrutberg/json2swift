#!/usr/bin/env node

'use strict';

var argparse = require('argparse');
var fs = require('fs');
var ObjectDecoder = require('./src/ObjectDecoder');
var TestBuilder = require('./src/TestBuilder');

var parser = new argparse.ArgumentParser({
  version: '0.0.1',
  addHelp: true
});

parser.addArgument([ 'file' ], { help: 'the JSON file' });
parser.addArgument([ '-tb', '--test-builder' ], { nargs: 0});

var args = parser.parseArgs();

var filename = args.file;

fs.readFile(filename, 'utf8', function(error, data) {
  if (error) {
    console.error(error);
  } else {
    var fileContents = JSON.parse(data);
    var structName = filename.substring(0, filename.indexOf('.'));
    var struct = ObjectDecoder().structsFromObject(structName, fileContents)[0];

    if (args.test_builder) {
      var testBuilder = TestBuilder(struct);
      console.log(testBuilder.toString());
    } else {
      console.log(struct.toString());
    }
  }
});

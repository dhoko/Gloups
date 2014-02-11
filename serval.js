#!/usr/bin/env node

var fs          = require('fs'),
    path        = require('path'),
    inquirer    = require('inquirer'),
    beautify    = require('js-beautify').js_beautify,
    child       = require('child_process'),
    log         = require('./src/lib/log'),
    makeInstall = require('./src/lib/makeinstall'),
    success     = log.success,
    info        = log.info,
    error       = log.error;

var current = __filename.split(path.sep);
current.pop();

/**
 * Main Gloups configuration
 *  - module : Directory n-1 where gloups is installed
 *  - src : Your app src directory
 *  - partials : Your app partials directory
 *  - views : Your app views directory
 *  - routes : Your app routes directory
 *  - generator : It will be the your current generator
 */
var SERVAL_CONFIG = {
  module    : current.splice(0,current.indexOf('gloups')).join(path.sep) + path.sep,
  src       : process.cwd() + path.sep + 'src' +path.sep,
  partials  : process.cwd() + path.sep + 'src' +path.sep + 'partials' + path.sep,
  views     : process.cwd() + path.sep + 'src' +path.sep + 'scripts' + path.sep + 'views' + path.sep,
  routes    : process.cwd() + path.sep + 'src' +path.sep + 'scripts' + path.sep + 'routers' + path.sep,
  generator : ""
};


if(process.argv.length > 2) {

  // Read the first additional argument passed to the program
  var command = process.argv[2];

  // Main command to execute a custom generator
  if('generate' === command) {

    var _args = process.argv;
    if(fs.existsSync('./.serval')) {
      var generator = require(process.cwd() + path.sep + '.serval');
      generator({
        app  : process.cwd() + path.sep,
        args : _args.splice(2),
        dir  : path.resolve('./.serval')  + path.sep
      },{
        beautify : beautify,
        inquirer : inquirer,
        success  : success,
        info     : info,
        error    : error
      });
    }else{
      error('No generators found for this app');
    }
  }

  // Main command to create an app from a generator
  if('make' === command) {

    /**
     * Read inside Gloups install directory/.., it's your global directory.
     * Then we will find each generators for gloups.
     * They must be : gloups-[generator name]
     */
    fs.readdir(path.resolve(SERVAL_CONFIG.module),function(err,files) {

      // Filter each folders and list only generators
      files = files.map(function(file) {
        if(file.toLowerCase().indexOf('serval') > -1) {
          var names = file.split('-');
          if(names.length > 1) {
            names.shift();
            return names.join('-');
          }
        }
      }).filter(function(item) { return item !== undefined;});

      inquirer.prompt([
        {
          type : "input",
          name : "name",
          message : "Name of your app :"
        },
        {
          type : "list",
          name : "generator",
          message : "Choose a generator :",
          choices : files
        }
      ], function( answers ) {
          SERVAL_CONFIG.generator = SERVAL_CONFIG.module + 'serval-' + answers.generator;
          makeInstall(answers,SERVAL_CONFIG);
      });

    });
  }

} else {

  console.log();
  info("You can use the following commands :");
  console.log(" > serval make : create an application");
  console.log(" > serval generator : execute a custom generator");
  console.log();
  error("You must specify an option");
}
// "use strict"
var fs          = require('fs'),
    inquirer    = require('inquirer'),
    log         = require('./src/lib/log'),
    makeInstall = require('./src/lib/makeinstall')
    success     = log.success,
    error       = log.error;

var config = {
  GENERATOR : module.filename.replace('gloups.js','') + "/src/generators/"
};

if(process.argv.length > 2) {

  // Read the first additional argument passed to the program
  var command = process.argv[2];

  if('make' === command) {

    fs.readdir(config.GENERATOR,function(err,files) {
      files.filter(function(file) {
        fs.lstat(config.GENERATOR+file, function(err, stats) {
          if(stats.isDirectory()) {
            return file;
          }
        });
      });


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
          makeInstall(answers,config);
      });

    });



  }

} else {
  error("You must specify an option");
}

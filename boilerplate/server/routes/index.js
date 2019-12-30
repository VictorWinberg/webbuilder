"use strict";

var fs = require("fs");
var path = require("path");
var basename = path.basename(__filename);

module.exports = function(app, db) {
  fs.readdirSync(__dirname)
    .filter(file => {
      return file.indexOf(".") !== 0 && file !== basename;
    })
    .forEach(file => {
      var route = file.substr(0, file.indexOf("."));
      require("./" + route)(app, db);
    });
};

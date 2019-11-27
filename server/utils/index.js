"use strict";

const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

module.exports = fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .reduce((utils, file) => ({ ...utils, ...require("./" + file) }), {});

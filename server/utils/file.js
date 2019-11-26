const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);
const exists = fs.existsSync;

module.exports = { readFile, writeFile, mkdir, exists };

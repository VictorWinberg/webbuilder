const fs = require("fs");
const util = require("util");

const readFile = (f) => util.promisify(fs.readFile)(f, "utf8");
const writeFile = (f, c) => util.promisify(fs.writeFile)(f, c, "utf8");
const mkdir = util.promisify(fs.mkdir);
const readdir = fs.readdirSync;
const exists = fs.existsSync;

module.exports = { readFile, writeFile, mkdir, exists, readdir };

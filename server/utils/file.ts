import fs from "fs";
import util from "util";
import readdirRec from "fs-readdir-recursive";

const readFile = f => util.promisify(fs.readFile)(f, "utf8");
const writeFile = (f, c) => util.promisify(fs.writeFile)(f, c, "utf8");
const mkdir = fs.mkdir;
const readdir = fs.readdirSync;
const exists = fs.existsSync;

export default { readFile, writeFile, mkdir, exists, readdir, readdirRec };

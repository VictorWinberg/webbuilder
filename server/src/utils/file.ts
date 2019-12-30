import fs from "fs";
import util from "util";
import readdirRec from "fs-readdir-recursive";

const readFile = (path: string) => {
  return util.promisify(fs.readFile)(path, "utf8");
};

const writeFile = (path: string, data: any) => {
  return util.promisify(fs.writeFile)(path, data, "utf8");
};

const mkdir = fs.mkdir;
const readdir = fs.readdirSync;
const exists = fs.existsSync;

export default { readFile, writeFile, mkdir, exists, readdir, readdirRec };

import fs from "fs";
import util from "util";

export const readFile = (path: string) => {
  return util.promisify(fs.readFile)(path, "utf8");
};

export const writeFile = (path: string, data: any) => {
  return util.promisify(fs.writeFile)(path, data, "utf8");
};

import { Express } from "express";
import fs from "fs";
import path from "path";

const basename = path.basename(__filename);

export default function(app: Express, db: any) {
  fs.readdirSync(__dirname)
    .filter(file => {
      return file.indexOf(".") !== 0 && file !== basename;
    })
    .forEach(file => {
      var route = file.substr(0, file.indexOf("."));
      require("./" + route).default(app, db);
    });
}

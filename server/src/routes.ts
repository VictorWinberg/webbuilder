import { Express } from "express";
import readdirRec from "fs-readdir-recursive";

export default function(app: Express, db: any): void {
  readdirRec(__dirname)
    .filter(f => f.includes("-route."))
    .forEach(file => {
      require("./" + file).default(app, db);
    });
}

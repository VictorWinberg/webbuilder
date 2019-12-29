import path from "path";
import { Sequelize } from "sequelize";
import readdirRec from "fs-readdir-recursive";

const env = process.env.NODE_ENV || "development";
const config = require("../dbconfig.json")[env];

const db: any = {};

var _sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

readdirRec(__dirname)
  .filter(f => f.includes("-model."))
  .forEach(file => {
    var model = _sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = _sequelize;

export default db;

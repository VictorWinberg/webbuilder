import path from "path";
import { Sequelize } from "sequelize";
import readdirRec from "fs-readdir-recursive";
import dbconfig from "../dbconfig.json";

const env = process.env.NODE_ENV || "development";
const config = (dbconfig as any)[env];

const db: any = {};

const _sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

readdirRec(__dirname)
  .filter(f => f.includes("-model."))
  .forEach(file => {
    const model = _sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = _sequelize;

export default db;

import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const basename = path.basename(__filename);

const db: any = {};

var _sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf(".") !== 0 && file !== basename;
  })
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

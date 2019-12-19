import fs from "fs";
import path from "path";
import sequelize from "sequelize";

var basename = path.basename(__filename);
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../../config/config.json")[env];
var db: any = {};

if (config.use_env_variable) {
  var _sequelize = new sequelize(process.env[config.use_env_variable], config);
} else {
  var _sequelize = new sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

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

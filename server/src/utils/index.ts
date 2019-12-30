import fs from "fs";
import path from "path";

const basename = path.basename(__filename);

export default fs
  .readdirSync(__dirname)
  .filter(file => {
    return file.indexOf(".") !== 0 && file !== basename;
  })
  .reduce((utils, file) => ({ ...utils, ...require("./" + file).default }), {});

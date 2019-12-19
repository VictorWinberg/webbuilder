import fs from "fs";
import path from "path";

const basename = path.basename(__filename);

export default fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
    );
  })
  .reduce((utils, file) => ({ ...utils, ...require("./" + file) }), {});

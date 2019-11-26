const format = require("string-template");

const { readFile, writeFile, exists, mkdir } = require("../utils");

const simpleBuild = async entities => {
  const ENTITIES_PATH = "../client/src/app/entities";
  if (!exists(ENTITIES_PATH)) {
    await mkdir(ENTITIES_PATH);
  }

  const template = await readFile("./templates/entities.vue", "utf8");
  const contents = format(template, { entities });
  await writeFile(ENTITIES_PATH + "/entities.vue", contents, "utf8");

  const entitiesRoutes = await readFile(
    "./templates/entities.routes.js",
    "utf8"
  );
  await writeFile(
    ENTITIES_PATH + "/entities.routes.js",
    entitiesRoutes,
    "utf8"
  );
};

module.exports = simpleBuild;

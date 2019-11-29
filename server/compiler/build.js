const { readFile, writeFile, exists, mkdir, readdir, format } = require("../utils");

const APP_PATH = "../client/src/app";
const app = name => `${APP_PATH}/${name}`;
const template = name => `./templates/${name}`;

const build = async entities => {
  // ENTITIES ROUTE
  const ENTITIES_PATH = APP_PATH + "/entities";
  if (!exists(ENTITIES_PATH)) {
    await mkdir(ENTITIES_PATH);
  }

  const template = await readFile("./templates/entities/entities.vue");
  const contents = format(template, "entities", { entities: JSON.stringify(entities) });
  await writeFile(ENTITIES_PATH + "/entities.vue", contents);

  const entitiesRoutes = await readFile(
    "./templates/entities/entities.routes.js"
  );
  await writeFile(ENTITIES_PATH + "/entities.routes.js", entitiesRoutes);

  // BUILD ENTITIES
  entities.forEach(async ({ name, fields }) => {
    const TEMPLATE_FOLDER = `./templates/entity`;

    const ENTITY_FOLDER = app(name);
    if (!exists(ENTITY_FOLDER)) {
      await mkdir(ENTITY_FOLDER);
    }

    // TODO: Optimization: Templates should be read once into a map that then can be used
    const templates = readdir(TEMPLATE_FOLDER);

    templates.forEach(async template => {
      const temp = await readFile(`${TEMPLATE_FOLDER}/${template}`);
      const contents = format(temp, name);

      await writeFile(`${ENTITY_FOLDER}/${name}-${template}`, contents);
    });
  });
};

module.exports = build;

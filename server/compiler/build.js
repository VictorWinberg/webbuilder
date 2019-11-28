const format = require("string-template");

const {
  readFile, 
  writeFile, 
  exists, 
  mkdir, 
  readdir
} = require("../utils");

const APP_PATH = "../client/src/app";
const app = (name) => `${APP_PATH}/${name}`;
const template = (name) => `./templates/${name}`;

const build = async entities => {
  // ENTITIES ROUTE
  const ENTITIES_PATH = APP_PATH + "/entities";
  if (!exists(ENTITIES_PATH)) {
    await mkdir(ENTITIES_PATH);
  }

  const template = await readFile("./templates/entities/entities.vue");
  const contents = format(template, { entities });
  await writeFile(
    ENTITIES_PATH + "/entities.vue", 
    contents
  );

  const entitiesRoutes = await readFile("./templates/entities/entities.routes.js");
  await writeFile(
    ENTITIES_PATH + "/entities.routes.js",
    entitiesRoutes
  );

  // BUILD ENTITIES
  entities.forEach(async ({name, fields}) => {
    const ENTITY_FOLDER = app(name);
    const TEMPLATE_FOLDER = template("entity");
    
    const templates = readdir(TEMPLATE_FOLDER);
    console.log(templates);
    
    templates.forEach(async template => {
      const contents = await readFile(`${TEMPLATE_FOLDER}/${template}`)
      await writeFile(`${ENTITY_FOLDER}/${template}`, contents);
    })
  });
};

module.exports = build;

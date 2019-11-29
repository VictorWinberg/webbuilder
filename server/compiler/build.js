const { readFile, writeFile, exists, mkdir, readdir, format } = require("../utils");

const APP_PATH = "../client/src/app";
const app = name => `${APP_PATH}/${name}`;
const template = name => `./templates/${name}`;

const build = async entities => {
  // TODO: Add more templates and "template-choosing"
  const TEMPLATE_FOLDER = `./templates/basic`;
  const templates = await Promise.all(
    readdir(TEMPLATE_FOLDER)
      .map(async component => ({ component, file: await readFile(`${TEMPLATE_FOLDER}/${component}`) }))
  );

  entities.forEach(async ({ name, fields }) => {
    const ENTITY_FOLDER = app(name);
    if (!exists(ENTITY_FOLDER)) {
      await mkdir(ENTITY_FOLDER);
    }

    templates.forEach(async ({ component, file }) => {
      const contents = format(file, name);

      await writeFile(`${ENTITY_FOLDER}/${name}-${component}`, contents);
    });
  });
};

module.exports = build;

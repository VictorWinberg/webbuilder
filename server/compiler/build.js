const {
  readFile,
  writeFile,
  exists,
  mkdir,
  readdirRec,
  format
} = require("../utils");
const path = require("path");

const APP_PATH = "../client/src/app";
const app = name => `${APP_PATH}/${name}`;
const template = name => `./templates/${name}`;

const build = async entities => {
  // TODO: Add more templates and "template-choosing"
  const TEMPLATE_FOLDER = `./templates/basic`;
  const templates = await Promise.all(
    readdirRec(TEMPLATE_FOLDER).map(async filePath => ({
      filePath,
      fileContents: await readFile(`${TEMPLATE_FOLDER}/${filePath}`)
    }))
  );

  entities.forEach(async ({ name, fields }) => {
    const ENTITY_FOLDER = app(name);

    templates.forEach(async ({ filePath, fileContents }) => {
      const contents = format(fileContents, name);
      const dirPath = path.dirname(filePath);
      const fileName = path.basename(filePath);
      const componentPath = `${ENTITY_FOLDER}/${dirPath}`;

      if (!exists(componentPath)) {
        await mkdir(componentPath, { recursive: true });
      }

      // await writeFile(componentPath, contents);
    });
  });
};

module.exports = build;

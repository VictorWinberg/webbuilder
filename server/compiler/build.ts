import path from "path";

import {
  readFile,
  writeFile,
  exists,
  mkdir,
  readdirRec,
  format
} from "../utils";

const readTemplates = async template =>
  await Promise.all(
    readdirRec(path.join("templates", template)).map(async filePath => ({
      filePath,
      fileContents: await readFile(path.join("templates", template, filePath))
    }))
  );

const buildTemplate = async (
  template,
  rootPath,
  entity,
  entityFields,
  flat = false
) => {
  const templateFiles = await readTemplates(template);
  templateFiles.forEach(async ({ filePath, fileContents }) => {
    const contents = format(fileContents, entity);
    const componentPath = path.join(
      rootPath,
      flat ? "" : entity,
      `${entity}-${filePath}`
    );

    await mkdir(path.dirname(componentPath), { recursive: true }, err => {});
    await writeFile(componentPath, contents);
  });
};

const build = async entities => {
  entities.forEach(async ({ name: entity, fields: entityFields }) => {
    await buildTemplate(
      "client-scaffold",
      "../client/src/app",
      entity,
      entityFields
    );
    await buildTemplate(
      "server-routes",
      "../server/routes",
      entity,
      entityFields,
      true
    );
    await buildTemplate(
      "server-model",
      "../server/models",
      entity,
      entityFields,
      true
    );
  });
};

export default build;

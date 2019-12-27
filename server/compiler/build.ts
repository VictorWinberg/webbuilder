import path from "path";

const {
  readFile,
  writeFile,
  exists,
  mkdir,
  readdirRec,
  format
} = require("../utils").default;

const readTemplates = async (template: string) =>
  await Promise.all(
    readdirRec(path.join("templates", template)).map(
      async (filePath: string) => ({
        filePath,
        fileContents: await readFile(path.join("templates", template, filePath))
      })
    )
  );

const buildTemplate = async (
  template: string,
  rootPath: string,
  entity: string,
  entityFields: any,
  flat = false
) => {
  const templateFiles = await readTemplates(template);
  templateFiles.forEach(async ({ filePath, fileContents }: any) => {
    const contents = format(fileContents, entity);
    const componentPath = path.join(
      rootPath,
      flat ? "" : entity,
      `${entity}-${filePath}`
    );

    await mkdir(path.dirname(componentPath), { recursive: true }, () => {});
    await writeFile(componentPath, contents);
  });
};

const build = async (entities: [{ name: string; fields: any }]) => {
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

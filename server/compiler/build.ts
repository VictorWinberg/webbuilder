import path from "path";

const {
  readFile,
  writeFile,
  mkdir,
  readdirRec,
  templating
} = require("../utils").default;

const build = async (entities: [{ component: string; fields: any }]) => {
  entities.forEach(async entity => {
    await buildTemplate("client-scaffold", "../client/src/app", entity);
    await buildTemplate("server-routes", "../server/routes", entity, true);
    await buildTemplate("server-model", "../server/models", entity, true);
  });
};

const buildTemplate = async (
  template: string,
  rootPath: string,
  entity: { component: string; fields: [] },
  flat = false
) => {
  const templateFiles = await readTemplates(template);
  templateFiles.forEach(async ({ filePath, fileContents }: any) => {
    const contents = templating(fileContents, entity);
    const componentPath = path.join(
      rootPath,
      flat ? "" : entity.component,
      `${entity.component}-${filePath}`
    );

    await mkdir(path.dirname(componentPath), { recursive: true }, () => {});
    await writeFile(componentPath, contents);
  });
};

const readTemplates = async (template: string) =>
  await Promise.all(
    readdirRec(path.join("templates", template)).map(
      async (filePath: string) => ({
        filePath,
        fileContents: await readFile(path.join("templates", template, filePath))
      })
    )
  );

export default build;

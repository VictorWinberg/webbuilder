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
    await buildTemplate("client", "scaffold", "src/app", entity);
    await buildTemplate("server", "route", "routes", entity, {
      withFolder: false
    });
    await buildTemplate("server", "model", "models", entity, {
      withFolder: false
    });
  });
};

const buildTemplate = async (
  root: string,
  template: string,
  dest: string,
  entity: { component: string; fields: [] },
  options = { withFolder: true }
) => {
  const templateFiles = await readTemplates(
    template,
    path.join("..", root, "templates")
  );
  templateFiles.forEach(async ({ filePath, fileContents }: any) => {
    const contents = templating(fileContents, entity);
    const componentPath = path.join(
      path.join("..", root, dest),
      options.withFolder ? entity.component : "",
      `${entity.component}-${filePath}`
    );

    await mkdir(path.dirname(componentPath), { recursive: true }, () => {});
    await writeFile(componentPath, contents);
  });
};

const readTemplates = async (template: string, templatePath: string) =>
  await Promise.all(
    readdirRec(path.join(templatePath, template)).map(
      async (filePath: string) => ({
        filePath,
        fileContents: await readFile(
          path.join(templatePath, template, filePath)
        )
      })
    )
  );

export default build;

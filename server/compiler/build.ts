import path from "path";

const {
  readFile,
  writeFile,
  mkdir,
  readdirRec,
  templating
} = require("../utils").default;

const build = async (entities: [{ entity: string; fields: any }]) => {
  entities.forEach(async obj => {
    await buildTemplate("client", "scaffold", "src/app", obj);
    await buildTemplate("server", "route", "routes", obj, {
      withFolder: false
    });
    await buildTemplate("server", "model", "models", obj, {
      withFolder: false
    });
  });
};

const buildTemplate = async (
  root: string,
  template: string,
  dest: string,
  obj: { entity: string; fields: [] },
  options = { withFolder: true }
) => {
  const templateFiles = await readTemplates(
    template,
    path.join("..", root, "templates")
  );
  templateFiles.forEach(async ({ filePath, fileContents }: any) => {
    const contents = templating(fileContents, obj);
    const entityPath = path.join(
      "..",
      root,
      dest,
      options.withFolder ? obj.entity : "",
      `${obj.entity}-${filePath}`
    );

    await mkdir(path.dirname(entityPath), { recursive: true }, () => {});
    await writeFile(entityPath, contents);
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

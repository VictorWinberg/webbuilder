import path from "path";

const {
  readFile,
  writeFile,
  mkdir,
  readdirRec,
  templating,
  ENTITIES_JSON
} = require("../utils").default;

type Entities = [{ entity: string; fields: any }];

const build = async () => {
  const contents = await readFile(ENTITIES_JSON, "utf8");
  const entities: Entities = JSON.parse(contents);
  entities.forEach(async obj => {
    await buildTemplate("client", "scaffold", "src/app", obj);
    await buildTemplate("server", "scaffold", "src/app", obj);
  });
  return entities;
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
    const contents = templating(fileContents, filePath, obj);
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

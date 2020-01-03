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
  await Promise.all(
    entities.map(
      async (obj): Promise<void> => {
        await buildTemplate("client", "scaffold", "src/app", obj);
        await buildTemplate("server", "scaffold", "src/app", obj);
      }
    )
  );
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
  await Promise.all(
    templateFiles.map(
      async ({ filePath, fileContents }: any): Promise<void> => {
        const contents = templating(fileContents, filePath, obj);
        const entityPath = path.join(
          "..",
          root,
          dest,
          options.withFolder ? obj.entity : "",
          path.dirname(filePath),
          `${obj.entity}-${path.basename(filePath)}`
        );

        await mkdir(path.dirname(entityPath), { recursive: true }, () => {});
        await writeFile(entityPath, contents);
      }
    )
  );
};

const readTemplates = async (template: string, templatePath: string) =>
  await Promise.all(
    readdirRec(path.join(templatePath, template)).map(
      async (filePath: string): Promise<{}> => {
        const fileContents = await readFile(
          path.join(templatePath, template, filePath)
        );
        return { filePath, fileContents };
      }
    )
  );

export default build;

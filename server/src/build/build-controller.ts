/* eslint-disable @typescript-eslint/no-use-before-define */
import path from "path";
import mkdirp from "mkdirp";
import { readEntitiesOrExample, Entity } from "../entities/entities-controller";

const {
  readFile,
  writeFile,
  readdirRec,
  templating
} = require("../utils").default;

const build = async (): Promise<Entity[]> => {
  const entities = await readEntitiesOrExample();
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
): Promise<void> => {
  const templateFiles = await readTemplates(
    template,
    path.join("..", root, "templates")
  );
  await Promise.all(
    templateFiles.map(
      async ({ filePath, fileContents }): Promise<void> => {
        const contents = templating(fileContents, filePath, obj);
        const entityPath = path.join(
          "..",
          root,
          dest,
          options.withFolder ? obj.entity : "",
          path.dirname(filePath),
          `${obj.entity}-${path.basename(filePath)}`
        );

        mkdirp.sync(path.dirname(entityPath));
        await writeFile(entityPath, contents);
      }
    )
  );
};

const readTemplates = async (
  template: string,
  templatePath: string
): Promise<{ filePath: string; fileContents: string }[]> =>
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

import path from "path";
import mkdirp from "mkdirp";
import readdirRec from "fs-readdir-recursive";

import { readFile, writeFile } from "../utils/file";
import { ENTITIES_JSON } from "../utils/paths";
import templating from "../utils/templating";

type Entities = [{ entity: string; fields: [] }];

const readTemplates = async (
  template: string,
  templatePath: string
): Promise<any> =>
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

        mkdirp(path.dirname(entityPath), err => {
          if (err) throw err;
        });
        await writeFile(entityPath, contents);
      }
    )
  );
};

const build = async (): Promise<Entities> => {
  const contents = await readFile(ENTITIES_JSON);
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

export default build;

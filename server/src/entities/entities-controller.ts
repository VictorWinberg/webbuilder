import { existsSync } from "fs";

import { readFile, writeFile } from "../utils/file";
import { ENTITIES_JSON, EXAMPLE_ENTITIES_JSON } from "../utils/paths";

export async function readEntitiesOrExample(): Promise<[]> {
  if (!existsSync(ENTITIES_JSON)) {
    const exampleData = await readFile(EXAMPLE_ENTITIES_JSON);
    await writeFile(ENTITIES_JSON, exampleData);
  }
  const entities = await readFile(ENTITIES_JSON);
  return JSON.parse(entities);
}

export async function writeEntities(entities: []): Promise<void> {
  // TODO: Add better typecheck and error message
  if (!Array.isArray(entities)) {
    throw new Error("Request should be of type Array");
  }

  await writeFile(ENTITIES_JSON, JSON.stringify(entities));
}

import { Express, Request, Response } from "express";

const {
  readFile,
  writeFile,
  exists,
  ENTITIES_JSON,
  EXAMPLE_ENTITIES_JSON
} = require("../utils").default;

export async function readEntitiesOrExample(): Promise<[]> {
  if (!exists(ENTITIES_JSON)) {
    const exampleData = await readFile(EXAMPLE_ENTITIES_JSON);
    await writeFile(ENTITIES_JSON, exampleData);
  }
  const entities = await readFile(ENTITIES_JSON, "utf8");
  return JSON.parse(entities);
}

export async function writeEntities(entities: []): Promise<void> {
  // TODO: Add better typecheck and error message
  if (!Array.isArray(entities)) {
    throw new Error("Request should be of type Array");
  }

  await writeFile(ENTITIES_JSON, JSON.stringify(entities), "utf8");
}

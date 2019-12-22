import { Express, Request, Response } from "express";

import { build } from "../compiler";
const { readFile, ENTITIES_JSON } = require("../utils").default;

export default (app: Express, _: any) => {
  app.get("/api/build", async (req: Request, res: Response) => {
    try {
      const entities = await readFile(ENTITIES_JSON, "utf8");
      await build(JSON.parse(entities));
      return res.send(JSON.parse(entities));
    } catch (err) {
      console.error("Error building entities.json", err);
      return res.send(err);
    }
  });
};

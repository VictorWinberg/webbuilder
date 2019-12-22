import { Express, Request, Response } from "express";

const {
  readFile,
  writeFile,
  exists,
  ENTITIES_JSON
} = require("../utils").default;

export default (app: Express, _: any) => {
  app.get("/api/entities", async (req: Request, res: Response) => {
    try {
      if (!exists(ENTITIES_JSON)) {
        await writeFile(ENTITIES_JSON, "[]");
      }
      const entities = await readFile(ENTITIES_JSON, "utf8");
      return res.send(JSON.parse(entities));
    } catch (err) {
      console.error("Error reading entities.json", err);
      return res.send(err);
    }
  });

  app.post("/api/entities", async (req: Request, res: Response) => {
    try {
      await writeFile(ENTITIES_JSON, JSON.stringify(req.body), "utf8");
      const entities = await readFile(ENTITIES_JSON, "utf8");
      return res.send(JSON.parse(entities));
    } catch (err) {
      console.error("Error creating entities.json", err);
      return res.status(400).send(err);
    }
  });
};

import { Express, Request, Response } from "express";

import { readEntitiesOrExample, writeEntities } from "./entities-controller";

export default (app: Express, _: any) => {
  app.get("/api/entities", async (req: Request, res: Response) => {
    try {
      const entities = await readEntitiesOrExample();
      return res.send(entities);
    } catch (err) {
      console.error("Error reading entities.json", err);
      return res.send(err);
    }
  });

  app.post("/api/entities", async (req: Request, res: Response) => {
    try {
      await writeEntities(req.body);
      return res.sendStatus(200);
    } catch (err) {
      console.error("Error creating entities.json", err);
      return res.status(400).send(err);
    }
  });
};

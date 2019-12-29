import { Express, Request, Response } from "express";

import build from "./build-controller";

export default (app: Express, _: any) => {
  app.get("/api/build", async (req: Request, res: Response) => {
    try {
      const entities = await build();
      return res.send(entities);
    } catch (err) {
      console.error("Error building entities.json", err);
      return res.send(err);
    }
  });
};

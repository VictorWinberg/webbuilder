import { Express, Request, Response } from "express";
import { omit } from "lodash/fp";

export default (app: Express, db: any) => {
  app.get("/api/{{entities}}", async (req: Request, res: Response) => {
    try {
      const results = await db.{{Entity}}.findAll();
      return res.send(results);
    } catch (err) {
      console.error("Error querying {{entities}}", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });

  app.post("/api/{{entities}}", async (req: Request, res: Response) => {
    try {
      const result = await db.{{Entity}}.create(omit("id", req.body));
      return res.send(result);
    } catch (err) {
      console.error("Error creating a {{entity}}", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });

  app.get("/api/{{entities}}/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await db.{{Entity}}.findByPk(id, { include: [{ all: true }] });
      return res.send(result);
    } catch (err) {
      console.error("Error querying {{entities}}", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });

  app.put("/api/{{entities}}/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await db.{{Entity}}.findByPk(id);
      await result.update(omit("id", req.body));
      return res.send(result);
    } catch (err) {
      console.error("Error updating {{entity}}", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });

  app.delete("/api/{{entities}}/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await db.{{Entity}}.findByPk(id);
      await result.destroy({ force: true });
      return res.send({ id });
    } catch (err) {
      console.error("Error deleting {{entity}}", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });
};

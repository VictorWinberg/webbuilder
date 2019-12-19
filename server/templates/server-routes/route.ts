import { Express, Request, Response } from "express";
import { omit } from "lodash/fp";

export default (app: Express, db) => {
  app.get("/api/<%components%>", async (req: Request, res: Response) => {
    try {
      const results = await db.<%Component%>.findAll();
      return res.send(results);
    } catch (err) {
      console.error("Error querying <%components%>", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });

  app.post("/api/<%components%>", async (req: Request, res: Response) => {
    try {
      const result = await db.<%Component%>.create(omit("id", req.body));
      return res.send(result);
    } catch (err) {
      console.error("Error creating a <%component%>", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });

  app.get("/api/<%components%>/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await db.<%Component%>.findByPk(id, { include: [{ all: true }] });
      return res.send(result);
    } catch (err) {
      console.error("Error querying <%components%>", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });

  app.put("/api/<%components%>/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await db.<%Component%>.findByPk(id);
      await result.update(omit("id", req.body));
      return res.send(result);
    } catch (err) {
      console.error("Error updating <%component%>", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });

  app.delete("/api/<%components%>/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await db.<%Component%>.findByPk(id);
      await result.destroy({ force: true });
      return res.send({ id });
    } catch (err) {
      console.error("Error deleting <%component%>", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });
};

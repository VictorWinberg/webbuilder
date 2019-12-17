const { omit } = require("lodash/fp");

module.exports = (app, db) => {
  app.get("/api/<%components%>", async (req, res) => {
    try {
      const results = await db.<%Component%>.findAll();
      return res.send(results);
    } catch (err) {
      console.log("Error querying <%components%>", JSON.stringify(err));
      return res.send(err);
    }
  });

  app.post("/api/<%components%>", async (req, res) => {
    try {
      const result = await db.<%Component%>.create(omit("id", req.body));
      return res.send(result);
    } catch (err) {
      console.log("Error creating a <%component%>", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });

  app.get("/api/<%components%>/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await db.<%Component%>.findById(id, { include: [{ all: true }] });
      return res.send(result);
    } catch (err) {
      console.log("Error querying <%components%>", JSON.stringify(err));
      return res.send(err);
    }
  });

  app.put("/api/<%components%>/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await db.<%Component%>.findById(id);
      await result.update(omit("id", req.body));
      return res.send(result);
    } catch (err) {
      console.log("Error updating <%component%>", JSON.stringify(err));
      res.status(400).send(err);
    }
  });

  app.delete("/api/<%components%>/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await db.<%Component%>.findById(id);
      await result.destroy({ force: true });
      return res.send({ id });
    } catch (err) {
      console.log("Error deleting <%component%>", JSON.stringify(err));
      res.status(400).send(err);
    }
  });
};

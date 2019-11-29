const { readFile, writeFile, exists, ENTITIES_JSON } = require("../utils");

module.exports = (app, db) => {
  app.get("/api/entities", async (req, res) => {
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

  app.post("/api/entities", async (req, res) => {
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

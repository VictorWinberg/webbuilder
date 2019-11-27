const { readFile, writeFile } = require("../utils");

const ENTITIES_PATH = "../entities.json";

module.exports = (app, db) => {
  app.get("/api/entities", async (req, res) => {
    try {
      const entities = await readFile(ENTITIES_PATH, "utf8");
      return res.send(JSON.parse(entities));
    } catch (err) {
      console.log("Error reading entities.json", JSON.stringify(err));
      return res.send(err);
    }
  });

  app.post("/api/entities", async (req, res) => {
    try {
      await writeFile(ENTITIES_PATH, JSON.stringify(req.body), "utf8");
      const entities = await readFile(ENTITIES_PATH, "utf8");
      return res.send(JSON.parse(entities));
    } catch (err) {
      console.log("Error creating entities.json", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });
};

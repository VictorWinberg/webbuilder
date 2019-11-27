const { build } = require("../compiler");
const { readFile, writeFile } = require("../utils");

const ENTITIES_PATH = "../entities.json";

module.exports = (app, db) => {
  app.get("/api/build", async (req, res) => {
    try {
      const entities = await readFile(ENTITIES_PATH, "utf8");
      await build(entities);
      return res.send(JSON.parse(entities));
    } catch (err) {
      console.log("Error building entities.json", JSON.stringify(err));
      return res.send(err);
    }
  });
};

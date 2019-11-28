const { build } = require("../compiler");
const { readFile, writeFile, ENTITIES_JSON } = require("../utils");

module.exports = (app, db) => {
  app.get("/api/build", async (req, res) => {
    try {
      const entities = await readFile(ENTITIES_JSON, "utf8");
      await build(entities);
      return res.send(JSON.parse(entities));
    } catch (err) {
      console.error("Error building entities.json", err);
      return res.send(err);
    }
  });
};

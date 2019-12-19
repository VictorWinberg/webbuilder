import express from "express";
import path from "path";
import bodyParser from "body-parser";

import db from "./models";
import routes from "./routes";

const app = express();

app.use(express.static(path.resolve(__dirname, "..", "client", "dist")));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/static"));

routes(app, db);

app.get("/api/*", (req, res) => {
  res.status(400).send("Not Found");
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "dist", "index.html"));
});

/*
 * Alters tables to fit models
 * Not recommended for production use
 * Deletes data in columns that were removed or had their type changed in the model
 */
db.sequelize.sync({ alter: true });

app.listen(3000, () => {
  // tslint:disable-next-line:no-console
  console.log("Server is up on port 3000");
});

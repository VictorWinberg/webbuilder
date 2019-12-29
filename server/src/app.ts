import express from "express";
import path from "path";
import bodyParser from "body-parser";

import db from "./models";
import routes from "./routes";

const app = express();

app.use(express.static(path.resolve(__dirname, "..", "..", "client", "dist")));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/static"));

routes(app, db);

app.get("/api/*", (_, res) => {
  res.status(400).send("Not Found");
});

app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "dist", "index.html"));
});

export default app;

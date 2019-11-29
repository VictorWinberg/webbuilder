// server.js

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const db = require("./models");

const app = express();

app.use(express.static(path.resolve(__dirname, "..", "client", "dist")));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/static"));

require("./routes")(app, db);

app.get("/api/*", (req, res) => {
  res.status(400).send("Not Found");
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "dist", "index.html"));
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});

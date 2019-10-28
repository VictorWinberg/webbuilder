// server.js

const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + "/static"));

require("./routes")(app, db);

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});

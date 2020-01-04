import { resolve } from "path";
import { config } from "dotenv";

import app from "./src/app";
import db from "./src/models";

config({ path: resolve(__dirname, "../.env") });

/*
 * Alters tables to fit models
 * Not recommended for production use
 * Deletes data in columns that were removed or had their type changed in the model
 */
db.sequelize.sync({ alter: true });

app.listen(process.env.PORT || 3000, () => {
  // tslint:disable-next-line:no-console
  console.log("Server is up on port " + (process.env.PORT || 3000));
});

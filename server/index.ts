import app from "./src/app";
import db from "./src/models";

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

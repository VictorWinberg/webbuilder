import app from "./src/app";

app.listen(process.env.PORT || 3000, () => {
  // tslint:disable-next-line:no-console
  console.log("Server is up on port " + (process.env.PORT || 3000));
});

import express, {Request, Response} from "express";
import path from "path";
import bodyParser from "body-parser";

import db from "./models";
import routes from "./routes";
import swagger from "./swagger";

const app = express();

const clientDist = path.resolve(__dirname, "..", "..", "client", "dist");

app.use(express.static(clientDist));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/static"));

routes(app, db);
swagger(app);

app.get("/api*", (req: Request, res: Response) => {
  res.status(400).send(`<h1>No route found for: <pre>${req.path}</pre></h1><button onclick="window.location.href = '/api/docs';">API Docs</button>`);
});

app.get("*", (_, res: Response) => {
  res.sendFile(path.resolve(clientDist, "index.html"));
});

export default app;

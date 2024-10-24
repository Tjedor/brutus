import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { MongoClient } from "mongodb";
import multer from "multer";
import { buildBrutusApp } from "./brutus/index";
import { buildRoutes } from "./buildRoutes";
import { buildPersonRepository } from "./repository/personRepository";
import { parseAndValidateEnv } from "./utils";

const port = 3000;

const env = parseAndValidateEnv();

const personRepository = buildPersonRepository(env.mongoConnectionUrl);

const brutusApp = buildBrutusApp(personRepository);

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use((err: Error, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send("Internal server error");
});

const upload = multer({ dest: "uploads/" });

buildRoutes(app, upload, brutusApp, env);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

import express from "express";
import multer from "multer";
import { BrutusApp } from "./brutus/index";
import { Person } from "./brutus/types";
import dotenv from "dotenv";
import { createAndValidateCreatePersonRequest } from "./brutus/utils";
import { BrutusEnv } from "./utils";

export const buildRoutes = (
  app: express.Express,
  upload: multer.Multer,
  brutusApp: BrutusApp,
  env: BrutusEnv
) => {
  app.post("/person", async (req, res) => {
    const body = req.body;
    var presonRequest: Person;
    try {
      presonRequest = createAndValidateCreatePersonRequest(body);
    } catch (error) {
      res.status(400).send("Bad request");
      return;
    }
    await brutusApp.createPerson(req.body);
    res.send("Person created");
  });

  app.post("/people", async (req, res) => {
    const body = req.body;
    const people = req.body.people;
    if (!people || !Array.isArray(body)) {
      res.status(400).send("Bad request: Expected an array of person objects");
      return;
    }

    const validPeople: Person[] = people.map(
      createAndValidateCreatePersonRequest
    );

    await brutusApp.createManyPersons(validPeople);
    res.send(`${validPeople.length} persons created`);
  });

  app.get("/person-stats", async (req, res) => {
    const result = await brutusApp.getPersonStats();
    res.send(JSON.stringify(result));
  });

  /* Was unsure if the task demanded the service to support files.
    This is not how I would do it for a production worthy service, but for the sake of the exercise */
  app.post("/upload-csv", upload.single("file"), async (req, res) => {
    const file = req.file;
    if (!file) {
      res.status(400).send("No file uploaded");
      return;
    }
    await brutusApp.uploadCsv(file);
    res.send(`File successfully uploaded`);
  });

  app.get("/person", async (req, res) => {
    const offset = parseInt((req.query.offset as string) ?? 0);
    const pageSize = parseInt((req.query.pageSize as string) ?? 20);
    const searchTerm = req.query.search as string;

    if (isNaN(offset) || isNaN(pageSize)) {
      res.status(400).send("Bad request: offset and pageSize must be numbers");
      return;
    }
    const result = await brutusApp.getPeople(offset, pageSize, { searchTerm });
    res.send(
      JSON.stringify({
        people: result.people,
        next: "http://" + env.host + "/person" + result.next,
        previous: "http://" + env.host + "/person" + result.previous,
      })
    );
  });
};

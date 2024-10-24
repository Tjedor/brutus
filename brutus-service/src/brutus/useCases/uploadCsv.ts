import type { PersonRepository } from "../../repository/personRepository";
import { createAndValidateCreatePersonRequest } from "../utils";
import { Person } from "../types";
import csvParser from "csv-parser";
import fs from "fs";

export const buildUploadCsv = (PersonRepository: PersonRepository) => {
  return async (file: Express.Multer.File) => {
    const results: Person[] = [];

    const stream = await fs
      .createReadStream(file.path)
      .pipe(csvParser())
      .on("data", (data) => {
        try {
          const personRequest = createAndValidateCreatePersonRequest({
            ...data,
            age: parseInt(data["age"]),
            firstname: data["name/first"],
            lastname: data["name/last"],
          });
          results.push(personRequest);
        } catch (error) {}
      })
      .on("end", async () => {
        await PersonRepository.createMany(results);
      });
  };
};

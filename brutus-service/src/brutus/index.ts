import type { PersonRepository } from "../repository/personRepository";
import { Person } from "./types";
import { buildGetPeople } from "./useCases/getPeople";
import { buildUploadCsv } from "./useCases/uploadCsv";

export const buildBrutusApp = (PersonRepository: PersonRepository) => {
  return {
    createPerson: async (person: Person) => {
      await PersonRepository.create(person);
    },
    createManyPersons: async (people: Person[]) => {
      await PersonRepository.createMany(people);
    },
    getPeople: buildGetPeople(PersonRepository),
    uploadCsv: buildUploadCsv(PersonRepository),
    getPersonStats: async () => {
      return await PersonRepository.getStats();
    },
  };
};

export type BrutusApp = ReturnType<typeof buildBrutusApp>;

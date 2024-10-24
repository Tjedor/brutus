import { Person } from "./types";

export const createAndValidateCreatePersonRequest: (p: any) => Person = (
  person: any
) => {
  if (!person.firstname || typeof person.firstname !== "string") {
    throw new Error("firstname is required");
  }
  return {
    seq: person.seq,
    firstname: person.firstname,
    lastname: person.lastname,
    age: person.age,
    street: person.street,
    city: person.city,
    state: person.state,
    latitude: person.latitude,
    longitude: person.longitude,
    ccnumber: person.ccnumber,
  };
};

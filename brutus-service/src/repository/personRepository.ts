import { MongoClient } from "mongodb";
import { Person } from "../brutus/types";

export const buildPersonRepository = (uri: string) => {
  const client = new MongoClient(uri);
  try {
    client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
  const db = client.db("Brutus");
  const collection = db.collection("Person");

  return {
    create: async (person: Person) => {
      await collection.insertOne(person);
      return;
    },
    createMany: async (persons: Person[]) => {
      await collection.insertMany(persons);
      return;
    },
    getStats: async () => {
      const topCities = await collection
        .aggregate<{ _id: string; count: number }>([
          {
            $group: {
              _id: "$city",
              count: { $sum: 1 },
            },
          },
          {
            $sort: { count: -1 },
          },
          {
            $limit: 3,
          },
        ])
        .toArray();

      const topNames = await collection
        .aggregate<{ _id: string; count: number }>([
          {
            $group: {
              _id: "$firstname",
              count: { $sum: 1 },
            },
          },
          {
            $sort: { count: -1 },
          },
          {
            $limit: 3,
          },
        ])
        .toArray();

      const avgrageAge = await collection
        .aggregate([
          {
            $group: {
              _id: null,
              avgAge: { $avg: { $toInt: "$age" } },
            },
          },
        ])
        .toArray();

      return {
        totalPeople: await collection.countDocuments(),
        averageAge: avgrageAge.length ? avgrageAge[0].avgAge : NaN,
        topCities: topCities.map((city) => ({
          name: city._id,
          count: city.count,
        })),
        topNames: topNames.map((name) => ({
          name: name._id,
          count: name.count,
        })),
      };
    },

    getMany: async (
      offset: number,
      pageSize: number,
      filter: {
        searchTerm?: string;
      }
    ) => {
      if (filter.searchTerm) {
        const query = [
          {
            $search: {
              index: "full-text-search",
              text: {
                query: filter.searchTerm,
                path: [
                  "seq",
                  "firstname",
                  "lastname",
                  "age",
                  "street",
                  "city",
                  "state",
                  "latitude",
                  "longitude",
                  "ccnumber",
                ],
              },
            },
          },
          { $skip: offset },
          {
            $limit: pageSize,
          },
        ];
        return await collection.aggregate(query).toArray();
      }

      return await collection
        .find<Person>({})
        .sort({ _id: 1 })
        .skip(offset)
        .limit(pageSize)
        .toArray();
    },
  };
};
export type PersonRepository = ReturnType<typeof buildPersonRepository>;

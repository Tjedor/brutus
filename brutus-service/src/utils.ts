import dotenv from "dotenv";

export type BrutusEnv = {
  mongoConnectionUrl: string;
  host: string;
};

export const parseAndValidateEnv: () => BrutusEnv = () => {
  const env = dotenv.config();
  if (env.error) {
    throw new Error("Could not find .env file");
  }

  const uri = env.parsed?.MONGO_CONNECTION_STRING;
  const host = env.parsed?.HOST;

  if (!host) {
    throw new Error("HOST is required");
  }

  if (!uri) {
    throw new Error("MONGO_CONNECTION_STRING is required");
  }

  return {
    mongoConnectionUrl: uri,
    host,
  };
};

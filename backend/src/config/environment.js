import dotenv from "dotenv";
import { z } from "zod";

// 1. Trigger dotenv to look for the .env file and load it into process.env
dotenv.config();

// Create a validation schema (with hep of zod) for all the environment variables we expect to use in our application
const environmentSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  APP_NAME: z.string().default("SyncNote Backend"),
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default("5000"),
  HOST: z.string().default("localhost"),
  DATABASE_URL: z
    .string()
    .url("DATABASE_URL must be a valid connection string")
    .optional(),
  API_PREFIX: z.string().default("/api/v1"),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  LOG_LEVEL: z.string().default("info"),
});

// 3. Validate process.env against our schema
const envServer = environmentSchema.safeParse(process.env);

if (!envServer.success) {
  console.error(" Invalid Environment Variables:");
  console.error(JSON.stringify(envServer.error.format(), null, 2));
  process.exit(1); // Crash the single thread immediately if configuration is broken!
}

// export all validated environment variables as a single config object
export default {
  NODE_ENV: envServer.data.NODE_ENV,
  APP_NAME: envServer.data.APP_NAME,
  PORT: envServer.data.PORT,
  HOST: envServer.data.HOST,
  DATABASE_URL: envServer.data.DATABASE_URL,
  API_PREFIX: envServer.data.API_PREFIX,
  CORS_ORIGIN: envServer.data.CORS_ORIGIN,
  LOG_LEVEL: envServer.data.LOG_LEVEL,
};

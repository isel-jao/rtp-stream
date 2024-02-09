import { z } from "zod";
import { logLevels, nodeEnv } from "./constants";

import dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
  LOG_LEVEL: z.enum(logLevels).default("info"),
  NODE_ENV: z.enum(nodeEnv).default("development"),
});

export type Env = z.infer<typeof envSchema>;

export default envSchema.parse(process.env);

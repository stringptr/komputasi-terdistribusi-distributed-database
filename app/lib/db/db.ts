import { drizzle } from "drizzle-orm/node-postgres";
import { Client, Pool } from "@yugabytedb/pg";
import * as schema from "./schema";

export const client = new Client({
  host: process.env.DB_HOSTS,
  port: 5433,
  user: process.env.YB_USER,
  password: process.env.YB_PASSWORD,
  database: process.env.YB_DATABASE,
  isYugabyte: true,
  loadBalance: true,
});

export const pool = new Pool({
  host: process.env.DB_HOSTS,
  port: 5433,
  user: process.env.YB_USER,
  password: process.env.YB_PASSWORD,
  database: process.env.YB_DATABASE,
  isYugabyte: true,
  loadBalance: true,
  keepAlive: true,
  keepAliveInitialDelayMillis: 10000,
  max: 10,
});

export const db = drizzle(pool, { schema });

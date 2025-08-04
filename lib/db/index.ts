import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

const sqlUrl = neon(process.env.DATABASE_URL!);

if (!sqlUrl) {
  throw new Error("DATABASE_URL is not defined");
}

export const db = drizzle(sqlUrl, { schema });

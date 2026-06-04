import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

/**
 * Neon serverless HTTP client — optimized for edge/serverless environments.
 * Uses HTTP-based querying (no persistent connections) which is ideal
 * for Next.js Server Components and Server Actions on Vercel.
 */
const sql = neon(process.env.DATABASE_URL!);

/**
 * Drizzle ORM instance — the single source of truth for all
 * database interactions throughout the application.
 *
 * Usage:
 * ```ts
 * import { db } from "@/db";
 * import { users } from "@/db/schema";
 *
 * const allUsers = await db.select().from(users);
 * ```
 */
export const db = drizzle(sql, { schema });

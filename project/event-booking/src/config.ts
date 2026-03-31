import { db } from "./db.js";
import { sql } from "drizzle-orm";

const testConnection = async () => {
  try {
    const result = await db.execute(sql`SELECT 1`);
    console.log("✅ Database connected:", result);
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
}

export default testConnection;

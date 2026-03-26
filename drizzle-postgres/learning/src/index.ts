import { db } from "./db.js";
import { users } from "./schema.js";


async function main() {
  await db.insert(users).values({ name: "Raza" });

  const allUsers = await db.select().from(users);

  console.log(allUsers);
}

main();
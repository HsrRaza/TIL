import { db } from "./db.js";
import { bookings, events, users } from "./schema.js";

const user = await db.insert(users).values({ name: "Raaz"}).returning();


const event = await db.insert(events)
          .values({title:"react meetup", date:"2026-01-01"})
          .returning();
        
      if (user[0] && event[0]) {
        await db.insert(bookings).values({
          userId: user[0].id,
          eventId: event[0].id,
        })
      }


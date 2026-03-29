import { eq, sql } from "drizzle-orm";
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

const data = await db.select()
            .from(bookings)
            .leftJoin(users,eq(bookings.userId,users.id))
            .leftJoin(events,eq(bookings.eventId,events.id));

console.log(data);




const results =await db.select({
        eventId:bookings.eventId,
        count:sql<number>`count(*)`,

    })
    .from(bookings)
    .groupBy(bookings.eventId);

    console.log(results);


const  userBookings = await db.select()
     .from(bookings)
     .where(eq(bookings.userId,1))
    
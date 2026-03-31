import express from "express";

import { db } from "./db.js";
import { bookings, events, users } from "./schema.js";
import { and, eq } from "drizzle-orm";
import testConnection from "./config.js";

const app = express();
const PORT = 3000;
testConnection();


app.use(express.json());

app.post("/book-event", async(req, res)=>{

   
})



// get all bookings

app.get("/bookings", async(req,res)=>{

    const results = await db
                        .select()
                        .from(bookings)
                        .leftJoin(users, eq(bookings.userId, users.id))
                        .leftJoin(events,eq(bookings.eventId, events.id));
    res.json(results);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


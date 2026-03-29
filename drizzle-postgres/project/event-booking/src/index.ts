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

    const {userId , eventId} = req.body;

    // Here you would typically invalidate the input and then insert a booking into the database

    // check duplicate booking ;




    const alreadyBooked = await db
                        .select()
                        .from(bookings)
                        .where(
                            and(
                                eq(bookings.userId, userId),
                                eq(bookings.eventId, eventId)
                            )
                        );

         if(alreadyBooked.length > 0){
            return res.status(400).json({
                message:"User has already booked this event"
            })
         }


        //  get event
        const eventss = await db 
                        .select()
                        .from(events)
                        .where(eq(events.id, eventId));
        
        if(!eventss[0]){
            return res.status(404).json({
                message:"Event not found"
            })
        }

//       count bookings 

         const existingBookingCount = await db
                              .select()
                              .from(bookings)
                              .where(eq(bookings.eventId, eventId))
        if(existingBookingCount.length >= eventss[0].seatLimit){
            return res.status(400).json({
                message:"No more seats available for this event"
            })
        }

        await db.insert(bookings).values({
            userId,
            eventId
        });

        res.status(201).json({
            message:"Booking Successful"
        })
})



// get all bookings

app.get("/bookings", async(req,res)=>{

    const results = await db
                        .select()
                        .from(bookings)
                        .leftJoin(users, eq(bookings.userId, users.id))
                        .leftJoin(events,eq(bookings.eventId, events.id));
    res.json(results);
})

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


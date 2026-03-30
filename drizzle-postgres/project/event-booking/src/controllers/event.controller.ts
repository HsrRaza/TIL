import { and, eq } from "drizzle-orm";

import type { Request, Response } from "express";
import { db } from "../db.js";
import { events } from "../schema.js";



export const createEvent = async(req:Request, res:Response) => {
    const { title,description, date, seatLimit } = req.body;

    const newEvent = await db.insert(events).values({
        title,
        description,
        date,
        seatLimit
    }).returning();

    res.status(201).json({
        message: "Event created successfully",
        event: newEvent[0]
    })
}

export const getEvents = async(req:Request, res:Response) => {
    const allEvents = await db.select().from(events);

    if(allEvents.length === 0){
        return res.status(404).json({
            message:"No events found"
        })
    }

    res.status(200).json({
        message:"Events retrieved successfully",
        events: allEvents
    })
}

export const deleteEvent = async(req:Request, res:Response)=>{

    const eventId  = Number(req.params.eventId);

    const event = await db.delete(events).where(eq(events.id, eventId)).returning();

    if(event.length === 0){
        return res.status(404).json({
            message:"Event not found"
        })
    }

    res.status(200).json({
        message:"Event deleted successfully",
        event: event[0]
    })
    
}


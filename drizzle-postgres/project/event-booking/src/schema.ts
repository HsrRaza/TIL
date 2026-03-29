import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

// users
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
})

// Events
export const events = pgTable("events", {
    id:serial("id").primaryKey(),
    title:text("title").notNull(),
    date:text("date").notNull(),
    seatLimit:integer("seat_limit").notNull()
})

export const bookings = pgTable("bookings",{
    id:serial("id").primaryKey(),
    userId:serial("user_id").notNull(),
    eventId:serial("event_id").notNull(),
})
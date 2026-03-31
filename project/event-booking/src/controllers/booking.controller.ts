import { and, eq, sql } from "drizzle-orm";
import { bookings, events } from "../schema.js";
import { db } from "../db.js";
import type { Request, Response } from "express";

export const createBookingEvent = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.body.userId);
    const eventId = Number(req.body.eventId);

    if (isNaN(userId) || isNaN(eventId)) {
      return res.status(400).json({
        message: "Invalid userId or eventId",
      });
    }

    const booking = await db.transaction(async (tx) => {
      // 1. Lock event row
      const eventResult = await tx.execute(sql`
        SELECT id, seat_limit
        FROM events
        WHERE id = ${eventId}
        FOR UPDATE
      `);

      const event = eventResult[0] as { id: number; seat_limit: number } | undefined;

      if (!event) {
        throw new Error("EVENT_NOT_FOUND");
      }

      // 2. Count current bookings
      const bookingCountResult = await tx
        .select({
          count: sql<number>`count(*)`,
        })
        .from(bookings)
        .where(eq(bookings.eventId, eventId));

      const currentCount = bookingCountResult[0]?.count ?? 0;

      if (currentCount >= event.seat_limit) {
        throw new Error("NO_SEATS");
      }

      // 3. Insert booking
      const inserted = await tx
        .insert(bookings)
        .values({
          userId,
          eventId,
        })
        .returning();

      return inserted[0];
    });

    return res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (error: any) {
    // duplicate booking from unique constraint
    if (error.code === "23505") {
      return res.status(409).json({
        message: "User already booked this event",
      });
    }

    if (error.message === "EVENT_NOT_FOUND") {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    if (error.message === "NO_SEATS") {
      return res.status(400).json({
        message: "No seats available",
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getBookingsByEventId = async (req: Request, res: Response) => {
  try {
    const eventId = Number(req.query.eventId);

    if (isNaN(eventId)) {
      return res.status(400).json({
        message: "Invalid eventId",
      });
    }

    const bookingsList = await db
      .select()
      .from(bookings)
      .where(eq(bookings.eventId, eventId));

    return res.status(200).json({
      bookings: bookingsList,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const bookingId = Number(req.params.bookingId);

    if (isNaN(bookingId)) {
      return res.status(400).json({
        message: "Invalid bookingId",
      });
    }

    const deleted = await db
      .delete(bookings)
      .where(eq(bookings.id, bookingId))
      .returning();

    if (deleted.length === 0) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
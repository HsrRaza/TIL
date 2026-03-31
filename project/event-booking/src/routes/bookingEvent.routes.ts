import { Router } from "express";
import { createBookingEvent, deleteBooking, getBookingsByEventId } from "../controllers/booking.controller.js";


const router = Router();

router.post("/bookevent", createBookingEvent);
router.get("/bookings",getBookingsByEventId );
router.delete("/bookings/:bookingId", deleteBooking)

export default router;
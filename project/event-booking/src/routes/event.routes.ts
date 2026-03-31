import { Router } from "express";
import { createEvent, deleteEvent, getEvents } from "../controllers/event.controller.js";

const router = Router();


router.post("/event", createEvent) 
router.get("/event/all",getEvents ) 
router.delete("/event/:eventId", deleteEvent)
export default router;

import { Router } from "express";
import { createUser, deleteUser, getUsers } from "../controllers/users.controller.js";
const router = Router();


router.post("/user",createUser );
router.get("/users", getUsers );
router.delete("/users/:userId", deleteUser);

export default router;
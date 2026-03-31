import type { Request, Response } from "express";
import { db } from "../db.js";
import { users } from "../schema.js";
import { eq } from "drizzle-orm";

export const createUser = async(req:Request, res:Response) => {
    const { name, email } = req.body;

    const newUser = await db.insert(users).values({
        name,
        email
    }).returning();

    res.status(201).json({
        message: "User created successfully",
        user: newUser[0]
    })
}

export const getUsers = async(req:Request, res:Response) => {
    const allUsers = await db.select().from(users);

    if(allUsers.length === 0){
        return res.status(404).json({
            message:"No users found"
        })
    }

    res.status(200).json({
        message:"Users retrieved successfully",
        users: allUsers
    })
}

export const deleteUser = async(req:Request, res:Response)=>{

    const userId  = Number(req.params.userId);

    const user = await db.delete(users).where(eq(users.id, userId)).returning();

    if(user.length === 0){
        return res.status(404).json({
            message:"User not found"
        })
    }

    res.status(200).json({
        message:"User deleted successfully",
        user: user[0]
    })
    
}
import express, { Router } from "express";
import {  createRoomForChat, createUser, getChatById, getRoom, signInUser } from "../controllers/user";
import { authUser } from "../middleware/auth";

const userRouter: Router = express.Router()

userRouter.get("/chat/:roomId", getChatById);
userRouter.get("/chatinfo/:slug",getRoom)

userRouter.post("/create", createUser)
userRouter.post("/login", signInUser)

userRouter.post("/create/room",createRoomForChat)

export default userRouter
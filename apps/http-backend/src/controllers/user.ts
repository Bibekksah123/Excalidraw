import { Request, Response } from "express";
import { createRoom, userLogin, userSingUp } from "@repo/common/types";
import { prismaClient } from "@repo/db/client"
import jwt from "jsonwebtoken"
import { JWT_SECRETE } from "@repo/backend-common/config";

const secrate = JWT_SECRETE;


export const createUser = async (req: Request, res: Response) => {
  try {
    const response = await userSingUp.safeParse(req.body);
    if (!response.success) {
      return res.status(400).json({ message: "please fill the correct data" });
    }
    //@ts-ignore
    const userData = response.data;
    try {
      await prismaClient.user.create({
        data: userData,
      });
    } catch (error) {
      return res.status(401).json({message:"User Already exits"})
    }
    return res.status(201).json({ message: "User created" });
  } catch (error) {
    return res.status(500).json({ message: "SignUp error"});
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const response = await userLogin.safeParse(req.body);
    if (!response.success) {
      return res.status(400).json({ message: "please fill the correct data" });
    }
    //@ts-ignore
    const userData = response.data;
    const responseData = await prismaClient.user.findFirst({
      where: {
        email: userData.email,
        password:userData.password
      }
    })
    if (!responseData) {
       return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: responseData.id }, secrate, {
      expiresIn: "7d",
    });
    return res.status(200).json({ message: "User Login" ,token:token});
  } catch (error) {
    return res.status(500).json({ message: "SignIn error" });
  }
};

export const createRoomForChat = async (req: Request, res: Response) => {
  try {
    const response = await createRoom.safeParse(req.body);
    if (!response.success) {
      return res.status(400).json({ message: "please fill the correct data" });
    }
    const roomData = response.data;
    //@ts-ignore
    const userId = req.user;
   const roomId= await prismaClient.room.create({
      data: {
        slug: roomData.name,
        Admin:userId,
      }
    })
    return res.status(201).json({ roomId:roomId?.id });
  } catch (error) {
    return res.status(500).json({error:error})
  }
};


export const getChatById = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;

    if (!roomId || typeof roomId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Valid Room ID is required",
      });
    }
   
    const roomData = await prismaClient.chat.findFirst({
      where: { roomId:Number(roomId) },
    });
    if (!roomData) {
      return res.status(404).json({ message: "Room not found" });
    }

    return res.status(200).json({ room: roomData });
  } catch (error) {
    console.error("Error fetching room:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};

export const getRoom = async (req: Request, res: Response) => {
  try {
        const { slug} = req.params;
    const roomData = await prismaClient.room.findFirst({
      where: {
      slug
    }});
    if (!roomData) {
      return res.status(404).json({ message: "Room not found" });
    }
    return res.status(200).json({ room: roomData });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

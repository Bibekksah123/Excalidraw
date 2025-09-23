import { JWT_SECRETE } from "@repo/backend-common/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

const secrate=JWT_SECRETE
export const authUser = async(req: Request, res: Response,next:NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = authHeader.replace(/^Bearer\s+/i, "");
    const decode = jwt.verify(token, secrate);
    if (!decode) {
      return res.status(404).json({ message: "Token Not Found"});
    }
    //@ts-ignore
    req.user = decode.id;
    next()
  } catch (error) {
    console.log(error)
     return res.status(401).json({ message: "error in middleware",error });
  }
  
}
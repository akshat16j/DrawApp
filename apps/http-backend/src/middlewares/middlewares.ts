import { NextFunction, Request,Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../index";


interface Payload{
    userId:string
}

async function authMiddleware(req:Request,res:Response,next:NextFunction){
    const tokenHeader = req.headers["authorization"];
    const token = tokenHeader;
    if(token && JWT_SECRET) {
        const decoded = jwt.verify(token, JWT_SECRET) as Payload;  
        if(decoded){
            req.body.userId = decoded.userId
            next()
        }else{
            res.status(400)
            return
        }
    }
}

export {authMiddleware}
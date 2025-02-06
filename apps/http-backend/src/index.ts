import express from "express";
import dotenv from "dotenv"
dotenv.config()
import { authMiddleware } from "./middlewares/middlewares";
import jwt from "jsonwebtoken"
import { CreateUserSchema, LoginSchema, CreateRoomSchema } from "@repo/common/types"

export const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

interface Payload{
    username:string
}

const app = express();

app.post("/signup", (req, res): void => {
    const { data, success, error } = CreateUserSchema.safeParse(req.body);
    if (!success) {
        res.status(400).send({ message: "Invalid data", error });
        return;
    }
    res.status(200).send({ message: "User created"});
});

app.post("/signin",(req,res)=>{
    const {data,success,error} = LoginSchema.safeParse(req.body)
    if(!success) {
        res.status(400).send({message:"Invalid data",error})
        return
    }
    const token = jwt.sign({username:data.username},JWT_SECRET)
    res.status(200).send({message:"User logged in",token})

})

app.post("/create-room",authMiddleware, (req,res)=>{
    res.status(200).send({message:"Room created",roomId:1})
    
})


app.listen(3001)
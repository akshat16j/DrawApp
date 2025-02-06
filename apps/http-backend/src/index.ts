import express from "express";
import dotenv from "dotenv"
dotenv.config()
import { authMiddleware } from "./middlewares/middlewares";
import jwt from "jsonwebtoken"

export const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

interface Payload{
    username:string
}

const app = express();

app.post("/signup", (req,res)=>{
    const username = req.query.username
    const password = req.query.password

})

app.post("/signin",(req,res)=>{
    const username = req.query.username
    const password = req.query.password
    const token = jwt.sign({username},JWT_SECRET)
    res.status(200).send({token})

})

app.post("/create-room",authMiddleware, (req,res)=>{
    res.status(200).send({message:"Room created",roomId:1})
    
})


app.listen(3001)
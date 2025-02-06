import { WebSocketServer } from 'ws';
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

interface Payload{
    userId:string
}

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws,request) {

  ws.on('error', console.error);

  const url = request.url
  if(!url) return
  const queryParams = new URLSearchParams(url.split("?")[1])
  const token = queryParams.get("token") || ""
  const decoded = jwt.verify(token, JWT_SECRET) as Payload;  
  if(!decoded || !decoded.userId) return

  ws.on("message",(data)=>{
    ws.send("something")
  })

});
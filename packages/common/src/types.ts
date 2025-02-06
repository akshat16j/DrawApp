import { z } from "zod"

export const CreateUserSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string(),
    name: z.string(),
    
})  

export const LoginSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string()
})  

export const CreateRoomSchema = z.object({
    name: z.string().min(3).max(20),
    
})  

export type CreateUserSchema = z.infer<typeof CreateUserSchema>
export type LoginSchema = z.infer<typeof LoginSchema>
export type CreateRoomSchema = z.infer<typeof CreateRoomSchema>
